import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp, Wallet, Target, FileText } from "lucide-react";

type Category = "سكن" | "طعام" | "نقل" | "فواتير" | "ترفيه" | "تعليم" | "صحة" | "ادخار" | "أخرى";

interface TransactionItem {
  id: string;
  label: string;
  amount: number; // positive number
  type: "income" | "expense";
  category?: Category;
}

const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  "سكن": ["إيجار", "بيت", "منزل", "رهون", "mortgage"],
  "طعام": ["طعام", "مطعم", "بقالة", "غذاء", "سوبر ماركت"],
  "نقل": ["بنزين", "وقود", "مواصلات", "تاكسي", "سيارة"],
  "فواتير": ["كهرباء", "ماء", "انترنت", "فاتورة", "هاتف"],
  "ترفيه": ["سينما", "مقهى", "ترفيه", "اشتراك", "Netflix"],
  "تعليم": ["مدرسة", "جامعة", "دورة", "تعليم"],
  "صحة": ["دواء", "عيادة", "تأمين", "صحة"],
  "ادخار": ["ادخار", "توفير", "حساب توفير"],
  "أخرى": []
};

function autoCategorize(label: string): Category {
  const normalized = label.toLowerCase();
  for (const [cat, keys] of Object.entries(CATEGORY_KEYWORDS) as [Category, string[]][]) {
    if (keys.some(k => normalized.includes(k.toLowerCase()))) return cat;
  }
  return "أخرى";
}

function suggestBudgetDistribution(incomeTotal: number, expenseTotals: Record<Category, number>, monthlyGoalAmount: number) {
  const essentialsCats: Category[] = ["سكن", "طعام", "فواتير", "نقل", "صحة"];
  const essentials = essentialsCats.reduce((s, c) => s + (expenseTotals[c] || 0), 0);
  const nonEssentialsCats: Category[] = ["ترفيه", "تعليم", "أخرى"];
  const nonEssentials = nonEssentialsCats.reduce((s, c) => s + (expenseTotals[c] || 0), 0);

  const baseSavings = Math.max(0, Math.min(monthlyGoalAmount, incomeTotal * 0.4));
  const remaining = Math.max(0, incomeTotal - (essentials + nonEssentials));
  const recommendedSavings = Math.max(baseSavings, Math.min(incomeTotal * 0.2, baseSavings + remaining));

  const targetNonEssentialCut = Math.max(0, monthlyGoalAmount - recommendedSavings);
  const cutRatio = nonEssentials > 0 ? Math.min(0.5, targetNonEssentialCut / nonEssentials) : 0;

  const plan: Record<Category, { current: number; recommended: number }> = {} as any;
  (Object.keys(expenseTotals) as Category[]).forEach(cat => {
    const current = expenseTotals[cat] || 0;
    const recommended = nonEssentialsCats.includes(cat) ? Math.round(current * (1 - cutRatio)) : current;
    plan[cat] = { current, recommended };
  });

  return { plan, recommendedSavings: Math.round(recommendedSavings) };
}

function generateAiReport(expenseTotals: Record<Category, number>, recommended: Record<Category, { current: number; recommended: number }>, savings: number, goalText: string, months: number) {
  const topSpends = Object.entries(expenseTotals).sort((a,b) => b[1]-a[1]).slice(0,3);
  const reductions = Object.entries(recommended)
    .filter(([, v]) => v.recommended < v.current)
    .sort((a,b)=> (b[1].current-b[1].recommended)-(a[1].current-a[1].recommended))
    .slice(0,3)
    .map(([k,v]) => `خفض ${k} من ${v.current} إلى ${v.recommended} دينار`);

  const steps = [
    `خصص ${savings} دينار ادخار شهري ثابت للهدف: ${goalText}.`,
    reductions[0] ? reductions[0] : "راجع المصاريف غير الضرورية وخفّض 10-15% شهرياً.",
    "اضبط تذكيراً أسبوعياً لمراجعة الإنفاق وتحديث البيانات.",
    months > 1 ? `قسّم الهدف إلى ${months} دفعات شهرية متساوية.` : "التزم بتحويل المبلغ فور استلام الدخل." 
  ];

  return {
    summary: `الإنفاق الأعلى: ${topSpends.map(([c,v])=>`${c} (${v}د)`).join("، ")}. الادخار المقترح: ${savings}د/شهر.`,
    actions: reductions,
    steps
  };
}

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#06b6d4", "#ef4444", "#a855f7", "#eab308", "#0ea5e9", "#94a3b8"];

const SmartGoalsFinance = () => {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [incomeInput, setIncomeInput] = useState(0);
  const [expenseLabel, setExpenseLabel] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [goalText, setGoalText] = useState("شراء طقم صالون");
  const [goalMonths, setGoalMonths] = useState(2);

  const totals = useMemo(() => {
    const byCategory: Record<Category, number> = { "سكن":0, "طعام":0, "نقل":0, "فواتير":0, "ترفيه":0, "تعليم":0, "صحة":0, "ادخار":0, "أخرى":0 };
    let income = 0;
    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else byCategory[t.category || "أخرى"] += t.amount;
    });
    return { income, byCategory };
  }, [transactions]);

  const monthlyGoalAmount = useMemo(() => {
    return Math.max(0, Math.round((goalText ? 0 : 0) + (incomeInput * 0 + (0)))) + Math.round(0); // placeholder calc
  }, [goalText, incomeInput]);

  const { plan, recommendedSavings } = useMemo(() => {
    return suggestBudgetDistribution(totals.income, totals.byCategory, Math.max(100, Math.round((goalMonths > 0 ? 1 : 1) * (goalMonths ? 200 : 200))));
  }, [totals, goalMonths]);

  const pieData = useMemo(() => {
    return (Object.keys(totals.byCategory) as Category[])
      .filter(c => totals.byCategory[c] > 0)
      .map((c, idx) => ({ name: c, value: totals.byCategory[c], color: COLORS[idx % COLORS.length] }));
  }, [totals]);

  const handleAddIncome = () => {
    if (incomeInput > 0) {
      setTransactions(prev => [...prev, { id: Date.now().toString(), label: "دخل شهري", amount: incomeInput, type: "income" }]);
      setIncomeInput(0);
    }
  };

  const handleAddExpense = () => {
    if (expenseAmount > 0 && expenseLabel.trim()) {
      setTransactions(prev => [...prev, { id: Date.now().toString(), label: expenseLabel, amount: expenseAmount, type: "expense", category: autoCategorize(expenseLabel) }]);
      setExpenseLabel("");
      setExpenseAmount(0);
    }
  };

  const report = useMemo(() => {
    return generateAiReport(totals.byCategory, plan, recommendedSavings, goalText, goalMonths);
  }, [totals, plan, recommendedSavings, goalText, goalMonths]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <section className="py-12">
        <div className="container px-4 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Target className="h-4 w-4" />
              لوحة الأهداف والميزانية الذكية
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">خطط ميزانيتك وحقق أهدافك</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">أدخل الدخل والمصروفات، ودعّنا نرتبها تلقائياً ونقترح توزيعاً ذكياً وطرقاً عملية للوصول إلى أهدافك.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" /> البيانات المالية</CardTitle>
                <CardDescription>أضف الدخل والمصروفات وسيتم تصنيفها تلقائياً</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm">الدخل الشهري (دينار)</label>
                    <div className="flex gap-2">
                      <Input type="number" value={incomeInput} onChange={(e)=>setIncomeInput(parseFloat(e.target.value)||0)} placeholder="مثال: 800" />
                      <Button onClick={handleAddIncome}>إضافة</Button>
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm">مصروف</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input value={expenseLabel} onChange={(e)=>setExpenseLabel(e.target.value)} placeholder="الوصف (مثال: بقالة، إيجار)" />
                      <Input type="number" value={expenseAmount} onChange={(e)=>setExpenseAmount(parseFloat(e.target.value)||0)} placeholder="المبلغ" />
                      <Button onClick={handleAddExpense}>إضافة</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm">هدفك الشهري</label>
                  <div className="grid md:grid-cols-3 gap-2">
                    <Input value={goalText} onChange={(e)=>setGoalText(e.target.value)} placeholder="مثال: شراء طقم صالون" />
                    <Input type="number" value={goalMonths} onChange={(e)=>setGoalMonths(parseInt(e.target.value)||1)} placeholder="عدد الأشهر (مثال: 2)" />
                    <div className="flex items-center text-sm text-muted-foreground">خطة على مدى {goalMonths} شهر</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" /> نظرة سريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>إجمالي الدخل</span><span className="font-bold">{totals.income} د</span></div>
                      {(Object.keys(totals.byCategory) as Category[]).map((c)=> (
                        <div key={c} className="flex justify-between text-muted-foreground"><span>{c}</span><span>{totals.byCategory[c]} د</span></div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> توزيع المصروفات</CardTitle>
                    </CardHeader>
                    <CardContent style={{height: 240}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie dataKey="value" data={pieData} outerRadius={90} label>
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ReTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" /> التوصيات الذكية</CardTitle>
                <CardDescription>توزيع مقترح لتحقيق الهدف الشهري</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm"><span>ادخار مقترح</span><span className="font-bold text-primary">{recommendedSavings} د / شهر</span></div>
                <Separator />
                <div className="space-y-2">
                  {(Object.keys(plan) as Category[]).map((c, idx) => (
                    <div key={c} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full" style={{background: COLORS[idx % COLORS.length]}}></span>{c}</span>
                        <span className="text-muted-foreground">{plan[c].current} → <span className="font-medium text-foreground">{plan[c].recommended}</span> د</span>
                      </div>
                      <Progress value={plan[c].current > 0 ? Math.min(100, (plan[c].recommended / plan[c].current) * 100) : 0} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> تقرير موجز</CardTitle>
              <CardDescription>ملخص واضح وخطوات عملية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="bg-muted/30 rounded-lg p-3">{report.summary}</div>
              {report.actions.length > 0 && (
                <div className="space-y-1">
                  <div className="font-medium">بنود للخفض:</div>
                  <ul className="list-disc pr-5 space-y-1">
                    {report.actions.map((a, i)=> (<li key={i}>{a}</li>))}
                  </ul>
                </div>
              )}
              <div className="space-y-1">
                <div className="font-medium">خطة خطوة بخطوة:</div>
                <ol className="list-decimal pr-5 space-y-1">
                  {report.steps.map((s, i)=> (<li key={i}>{s}</li>))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SmartGoalsFinance;


