import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Download, 
  Share2,
  Calendar as CalendarIcon,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  PieChart,
  FileBarChart,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Mail
} from "lucide-react";
import { format, subDays, subWeeks, subMonths } from "date-fns";
import { ar } from "date-fns/locale";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: "summary" | "detailed" | "analytics" | "custom";
  frequency: "weekly" | "monthly" | "quarterly" | "on-demand";
  sections: string[];
  estimatedTime: string;
}

interface ReportData {
  period: {
    start: Date;
    end: Date;
  };
  goals: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
  };
  family: {
    members: string[];
    topPerformer: string;
    completionRate: number;
  };
  insights: string[];
  recommendations: string[];
}

const ReportsGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [reportPeriod, setReportPeriod] = useState("this-month");
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTemplates: ReportTemplate[] = [
    {
      id: "weekly-summary",
      name: "تقرير أسبوعي موجز",
      description: "ملخص سريع للإنجازات والمهام الأسبوعية",
      icon: Clock,
      category: "summary",
      frequency: "weekly",
      sections: ["الإنجازات", "المهام المعلقة", "التوصيات"],
      estimatedTime: "دقيقتان"
    },
    {
      id: "monthly-detailed",
      name: "تقرير شهري مفصل",
      description: "تحليل شامل للأداء الشهري مع رسوم بيانية",
      icon: BarChart3,
      category: "detailed",
      frequency: "monthly",
      sections: ["نظرة عامة", "تحليل الأهداف", "أداء الأسرة", "الاتجاهات", "التوصيات"],
      estimatedTime: "5 دقائق"
    },
    {
      id: "goals-progress",
      name: "تقرير تقدم الأهداف",
      description: "متابعة مفصلة لجميع الأهداف الأسرية",
      icon: Target,
      category: "analytics",
      frequency: "on-demand",
      sections: ["حالة الأهداف", "معدلات الإنجاز", "التحديات", "خطط التحسين"],
      estimatedTime: "3 دقائق"
    },
    {
      id: "family-performance",
      name: "تقرير أداء الأسرة",
      description: "تقييم مشاركة وأداء جميع أفراد الأسرة",
      icon: Users,
      category: "analytics", 
      frequency: "monthly",
      sections: ["أداء فردي", "العمل الجماعي", "نقاط القوة", "فرص التحسين"],
      estimatedTime: "4 دقائق"
    },
    {
      id: "custom-report",
      name: "تقرير مخصص",
      description: "قم بإنشاء تقرير مخصص حسب احتياجاتك",
      icon: FileBarChart,
      category: "custom",
      frequency: "on-demand",
      sections: ["قابل للتخصيص"],
      estimatedTime: "حسب الاختيار"
    }
  ];

  // Sample data - في التطبيق الحقيقي ستأتي من API
  const sampleReportData: ReportData = {
    period: {
      start: subMonths(new Date(), 1),
      end: new Date()
    },
    goals: {
      total: 8,
      completed: 3,
      inProgress: 4,
      overdue: 1
    },
    tasks: {
      total: 45,
      completed: 38,
      pending: 7
    },
    family: {
      members: ["بابا", "ماما", "أحمد", "فاطمة"],
      topPerformer: "ماما",
      completionRate: 84
    },
    insights: [
      "معدل إنجاز المهام تحسن بنسبة 15% هذا الشهر",
      "الأهداف المالية تسير حسب الخطة المحددة",
      "هناك حاجة لتحسين التواصل في المهام الجماعية"
    ],
    recommendations: [
      "زيادة وقت المراجعة الأسبوعية للأهداف",
      "تحديد مكافآت للأهداف المكتملة",
      "تقسيم المهام الكبيرة إلى مهام أصغر"
    ]
  };

  const categoryColors = {
    "summary": "bg-primary/10 text-primary border-primary/20",
    "detailed": "bg-secondary/10 text-secondary border-secondary/20",
    "analytics": "bg-accent/10 text-accent border-accent/20", 
    "custom": "bg-warm/10 text-warm border-warm/20"
  };

  const allSections = [
    "نظرة عامة",
    "الإنجازات",
    "المهام المعلقة", 
    "تحليل الأهداف",
    "أداء الأسرة",
    "الاتجاهات والرسوم البيانية",
    "التحديات",
    "التوصيات والخطط",
    "ملخص تنفيذي"
  ];

  const toggleSection = (section: string) => {
    setSelectedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const generateReport = async () => {
    setIsGenerating(true);
    // محاكاة توليد التقرير
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // هنا يمكن إضافة منطق إنشاء PDF أو تصدير البيانات
    console.log("Report generated with:", {
      template: selectedTemplate,
      period: reportPeriod,
      sections: selectedSections,
      format: reportFormat
    });
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-warm/10 text-warm px-4 py-2 rounded-full text-sm font-medium">
          <FileText className="h-4 w-4" />
          مولد التقارير الذكي
        </div>
        <h2 className="text-3xl font-bold">تقارير تلقائية ومخصصة</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          احصل على تقارير مفصلة عن إنجازات أسرتك مع رؤى وتوصيات ذكية لتحسين الأداء
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Selection */}
          <Card className="planning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                اختر نوع التقرير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {reportTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? "border-primary bg-primary/5 shadow-soft" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      if (template.id !== "custom-report") {
                        setSelectedSections(template.sections);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warm/20 to-warm/10 flex items-center justify-center">
                          <template.icon className="h-5 w-5 text-warm" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={categoryColors[template.category]} variant="outline">
                              {template.category === "summary" ? "موجز" : 
                               template.category === "detailed" ? "مفصل" :
                               template.category === "analytics" ? "تحليلي" : "مخصص"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {template.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedTemplate === template.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Period Selection */}
          <Card className="planning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                فترة التقرير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Select value={reportPeriod} onValueChange={setReportPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-week">هذا الأسبوع</SelectItem>
                    <SelectItem value="last-week">الأسبوع الماضي</SelectItem>
                    <SelectItem value="this-month">هذا الشهر</SelectItem>
                    <SelectItem value="last-month">الشهر الماضي</SelectItem>
                    <SelectItem value="this-quarter">هذا الربع</SelectItem>
                    <SelectItem value="custom">فترة مخصصة</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="html">صفحة ويب</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reportPeriod === "custom" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ البداية</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {customStartDate ? format(customStartDate, "yyyy/MM/dd", { locale: ar }) : "اختر التاريخ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={customStartDate}
                          onSelect={setCustomStartDate}
                          locale={ar}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تاريخ النهاية</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {customEndDate ? format(customEndDate, "yyyy/MM/dd", { locale: ar }) : "اختر التاريخ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={customEndDate}
                          onSelect={setCustomEndDate}
                          locale={ar}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section Selection (for custom reports) */}
          {selectedTemplate === "custom-report" && (
            <Card className="planning-card">
              <CardHeader>
                <CardTitle>أقسام التقرير المخصص</CardTitle>
                <CardDescription>اختر الأقسام التي تريد تضمينها في تقريرك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {allSections.map((section) => (
                    <div key={section} className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id={section}
                        checked={selectedSections.includes(section)}
                        onCheckedChange={() => toggleSection(section)}
                      />
                      <label htmlFor={section} className="text-sm font-medium cursor-pointer">
                        {section}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          {/* Report Preview */}
          <Card className="planning-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                معاينة التقرير
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <h4 className="font-medium">
                    {selectedTemplate ? reportTemplates.find(t => t.id === selectedTemplate)?.name : "اختر نوع التقرير"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {reportPeriod === "this-month" ? "هذا الشهر" : "الفترة المحددة"}
                  </p>
                  {selectedSections.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {selectedSections.length} أقسام محددة
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Stats Preview */}
              <div className="space-y-3">
                <h5 className="font-medium text-sm">معاينة البيانات</h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>الأهداف المكتملة</span>
                    <span className="font-bold text-success">{sampleReportData.goals.completed}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>المهام المنجزة</span>
                    <span className="font-bold text-primary">{sampleReportData.tasks.completed}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>معدل الإنجاز</span>
                    <span className="font-bold text-accent">{sampleReportData.family.completionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-background rounded">
                    <span>أفضل أداء</span>
                    <span className="font-bold text-secondary">{sampleReportData.family.topPerformer}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="planning-card">
            <CardHeader>
              <CardTitle>إجراءات التقرير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="planning" 
                className="w-full"
                onClick={generateReport}
                disabled={!selectedTemplate || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    إنشاء التقرير
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full" disabled>
                <Download className="h-4 w-4 mr-2" />
                تحميل آخر تقرير
              </Button>
              
              <Button variant="outline" className="w-full" disabled>
                <Share2 className="h-4 w-4 mr-2" />
                مشاركة التقرير
              </Button>
              
              <Button variant="outline" className="w-full" disabled>
                <Mail className="h-4 w-4 mr-2" />
                إرسال بالإيميل
              </Button>
            </CardContent>
          </Card>

          {/* Scheduled Reports */}
          <Card className="planning-card">
            <CardHeader>
              <CardTitle className="text-sm">التقارير المجدولة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>تقرير أسبوعي</span>
                  <Badge variant="outline" className="text-xs">نشط</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>تقرير شهري مفصل</span>
                  <Badge variant="outline" className="text-xs">نشط</Badge>
                </div>
                <Button variant="ghost" className="w-full mt-2 text-xs">
                  إدارة التقارير المجدولة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsGenerator;