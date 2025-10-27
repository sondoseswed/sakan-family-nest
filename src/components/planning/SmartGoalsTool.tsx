import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Target,
  Calendar,
  TrendingUp,
  CheckCircle,
  Plus,
  Clock,
  Star,
  Users,
  Edit,
  Trash2,
} from "lucide-react";

interface SmartGoal {
  id: string;
  title: string;
  description: string;
  category: "شخصي" | "عائلي" | "مالي" | "صحي" | "تعليمي" | "مهني";
  priority: "عالية" | "متوسطة" | "منخفضة";
  deadline: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: string;
  progress: number;
  status: "active" | "completed" | "paused";
}

const SmartGoalsTool = () => {
  const [goals, setGoals] = useState<SmartGoal[]>([
    {
      id: "1",
      title: "توفير للبيت الجديد",
      description: "توفير مبلغ كافٍ لشراء منزل عائلي جديد",
      category: "مالي",
      priority: "عالية",
      deadline: "2024-12-31",
      specific: "توفير 100,000 دينار لدفعة أولى",
      measurable: "5,000 دينار شهرياً",
      achievable: "بناءً على الراتب الحالي والمصروفات",
      relevant: "هدف أساسي لاستقرار الأسرة",
      timebound: "خلال 20 شهر",
      progress: 65,
      status: "active",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<SmartGoal>>({
    category: "شخصي",
    priority: "متوسطة",
    progress: 0,
    status: "active",
  });

  const categoryColors = {
    شخصي: "bg-primary/10 text-primary border-primary/20",
    عائلي: "bg-warm/10 text-warm border-warm/20",
    مالي: "bg-success/10 text-success border-success/20",
    صحي: "bg-accent/10 text-accent border-accent/20",
    تعليمي: "bg-secondary/10 text-secondary border-secondary/20",
    مهني: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
  };

  const priorityColors = {
    عالية: "bg-destructive/10 text-destructive border-destructive/20",
    متوسطة: "bg-accent/10 text-accent border-accent/20",
    منخفضة:
      "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.description) {
      const goal: SmartGoal = {
        ...newGoal,
        id: Date.now().toString(),
        title: newGoal.title || "",
        description: newGoal.description || "",
        category: newGoal.category || "شخصي",
        priority: newGoal.priority || "متوسطة",
        deadline: newGoal.deadline || "",
        specific: newGoal.specific || "",
        measurable: newGoal.measurable || "",
        achievable: newGoal.achievable || "",
        relevant: newGoal.relevant || "",
        timebound: newGoal.timebound || "",
        progress: newGoal.progress || 0,
        status: newGoal.status || "active",
      };

      setGoals([...goals, goal]);
      setNewGoal({
        category: "شخصي",
        priority: "متوسطة",
        progress: 0,
        status: "active",
      });
      setShowAddForm(false);
    }
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, progress } : goal))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <Target className="h-4 w-4" />
          أداة الأهداف الذكية
        </div>
        <h2 className="text-3xl font-bold">تحديد الأهداف بطريقة SMART</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          حدد أهدافك الأسرية بطريقة ذكية ومنهجية باستخدام معايير SMART (محددة،
          قابلة للقياس، قابلة للتحقيق، ذات صلة، محددة بوقت)
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{goals.length}</div>
          <div className="text-sm text-muted-foreground">إجمالي الأهداف</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-success">
            {goals.filter((g) => g.status === "completed").length}
          </div>
          <div className="text-sm text-muted-foreground">أهداف مكتملة</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-accent">
            {goals.filter((g) => g.status === "active").length}
          </div>
          <div className="text-sm text-muted-foreground">أهداف نشطة</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-secondary">
            {Math.round(
              goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
            ) || 0}
            %
          </div>
          <div className="text-sm text-muted-foreground">متوسط التقدم</div>
        </Card>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowAddForm(true)}
          variant="planning"
          size="lg"
          className="shadow-elegant hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          إضافة هدف جديد
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="planning-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              إضافة هدف SMART جديد
            </CardTitle>
            <CardDescription>
              املأ جميع البيانات لإنشاء هدف ذكي ومحدد
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الهدف</Label>
                <Input
                  id="title"
                  value={newGoal.title || ""}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  placeholder="مثال: توفير للبيت الجديد"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">التاريخ المستهدف</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline || ""}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الهدف</Label>
              <Textarea
                id="description"
                value={newGoal.description || ""}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
                placeholder="وصف تفصيلي للهدف وأهميته"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4" dir="rtl">
              <div className="space-y-2">
                <Label>الفئة</Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, category: value as any })
                  }
                  dir="rtl"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شخصي">شخصي</SelectItem>
                    <SelectItem value="عائلي">عائلي</SelectItem>
                    <SelectItem value="مالي">مالي</SelectItem>
                    <SelectItem value="صحي">صحي</SelectItem>
                    <SelectItem value="تعليمي">تعليمي</SelectItem>
                    <SelectItem value="مهني">مهني</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الأولوية</Label>
                <Select
                  value={newGoal.priority}
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, priority: value as any })
                  }
                  dir="rtl"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="عالية">عالية</SelectItem>
                    <SelectItem value="متوسطة">متوسطة</SelectItem>
                    <SelectItem value="منخفضة">منخفضة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SMART Criteria */}
            {/* <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Star className="h-5 w-5 text-accent" />
                معايير SMART
              </div>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specific">محدد (Specific)</Label>
                  <Input 
                    id="specific"
                    value={newGoal.specific || ""}
                    onChange={(e) => setNewGoal({...newGoal, specific: e.target.value})}
                    placeholder="مثال: توفير 100,000 دينار لدفعة أولى"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="measurable">قابل للقياس (Measurable)</Label>
                  <Input 
                    id="measurable"
                    value={newGoal.measurable || ""}
                    onChange={(e) => setNewGoal({...newGoal, measurable: e.target.value})}
                    placeholder="مثال: 5,000 دينار شهرياً"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="achievable">قابل للتحقيق (Achievable)</Label>
                  <Input 
                    id="achievable"
                    value={newGoal.achievable || ""}
                    onChange={(e) => setNewGoal({...newGoal, achievable: e.target.value})}
                    placeholder="مثال: بناءً على الراتب الحالي والمصروفات"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relevant">ذو صلة (Relevant)</Label>
                  <Input 
                    id="relevant"
                    value={newGoal.relevant || ""}
                    onChange={(e) => setNewGoal({...newGoal, relevant: e.target.value})}
                    placeholder="مثال: هدف أساسي لاستقرار الأسرة"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timebound">محدد بوقت (Time-bound)</Label>
                  <Input 
                    id="timebound"
                    value={newGoal.timebound || ""}
                    onChange={(e) => setNewGoal({...newGoal, timebound: e.target.value})}
                    placeholder="مثال: خلال 20 شهر"
                  />
                </div>
              </div>
            </div> */}

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                إلغاء
              </Button>
              <Button variant="planning" onClick={addGoal}>
                إضافة الهدف
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="planning-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                    <Badge className={categoryColors[goal.category]}>
                      {goal.category}
                    </Badge>
                    <Badge className={priorityColors[goal.priority]}>
                      {goal.priority}
                    </Badge>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">التقدم</span>
                  <span className="text-sm font-bold text-primary">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex gap-2">
                  {[0, 25, 50, 75, 100].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => updateProgress(goal.id, value)}
                      className={
                        goal.progress === value
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>

              {/* SMART Details */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-primary">محدد:</div>
                  <div className="text-sm">{goal.specific}</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-secondary">قابل للقياس:</div>
                  <div className="text-sm">{goal.measurable}</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-accent">قابل للتحقيق:</div>
                  <div className="text-sm">{goal.achievable}</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-warm">ذو صلة:</div>
                  <div className="text-sm">{goal.relevant}</div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="font-medium text-success">محدد بوقت:</div>
                  <div className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {goal.timebound} - {goal.deadline}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="planning" size="sm">
                  تحديث التقدم
                  <TrendingUp className="h-4 w-4 mr-2" />
                </Button>
                <Button variant="outline" size="sm">
                  عرض التفاصيل
                </Button>
                {goal.progress === 100 && (
                  <Button variant="success" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    مكتمل
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartGoalsTool;
