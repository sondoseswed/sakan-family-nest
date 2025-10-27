import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  BarChart3, 
  Target,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Star,
  Award,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

interface ProgressData {
  id: string;
  title: string;
  type: "goal" | "task" | "project";
  category: string;
  progress: number;
  target: number;
  unit: string;
  startDate: Date;
  endDate: Date;
  status: "on-track" | "at-risk" | "behind" | "completed";
  assignedTo: string[];
  lastUpdate: Date;
  weeklyProgress: number[];
}

const ProgressTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const progressData: ProgressData[] = [
    {
      id: "1",
      title: "توفير للبيت الجديد",
      type: "goal", 
      category: "مالي",
      progress: 65000,
      target: 100000,
      unit: "دينار",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      status: "on-track",
      assignedTo: ["بابا", "ماما"],
      lastUpdate: new Date(),
      weeklyProgress: [5, 8, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]
    },
    {
      id: "2",
      title: "تحسين اللياقة البدنية",
      type: "goal",
      category: "صحي", 
      progress: 40,
      target: 100,
      unit: "نقطة",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-06-30"),
      status: "at-risk",
      assignedTo: ["بابا", "ماما"],
      lastUpdate: new Date(),
      weeklyProgress: [10, 15, 22, 25, 30, 32, 35, 37, 40]
    },
    {
      id: "3",
      title: "إنجاز المهام المنزلية",
      type: "task",
      category: "منزلية",
      progress: 78,
      target: 100,
      unit: "مهمة",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-31"),
      status: "on-track",
      assignedTo: ["الجميع"],
      lastUpdate: new Date(),
      weeklyProgress: [20, 35, 50, 65, 78]
    },
    {
      id: "4",
      title: "تطوير مهارات الأطفال",
      type: "project",
      category: "تعليمي",
      progress: 30,
      target: 100,
      unit: "درس",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-08-31"),
      status: "behind",
      assignedTo: ["أحمد", "فاطمة"],
      lastUpdate: new Date(),
      weeklyProgress: [5, 10, 15, 18, 22, 25, 28, 30]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "text-success";
      case "at-risk": return "text-accent";
      case "behind": return "text-destructive";
      case "completed": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-track": return "bg-success/10 text-success border-success/20";
      case "at-risk": return "bg-accent/10 text-accent border-accent/20";
      case "behind": return "bg-destructive/10 text-destructive border-destructive/20";
      case "completed": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-track": return "في المسار الصحيح";
      case "at-risk": return "معرض للخطر";
      case "behind": return "متأخر";
      case "completed": return "مكتمل";
      default: return status;
    }
  };

  const getTrendIcon = (data: ProgressData) => {
    const recent = data.weeklyProgress.slice(-2);
    if (recent.length < 2) return <Minus className="h-4 w-4" />;
    
    if (recent[1] > recent[0]) return <ArrowUp className="h-4 w-4 text-success" />;
    if (recent[1] < recent[0]) return <ArrowDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const filteredData = progressData.filter(item => 
    selectedCategory === "all" || item.category === selectedCategory
  );

  const overallStats = {
    totalItems: filteredData.length,
    onTrack: filteredData.filter(i => i.status === "on-track").length,
    atRisk: filteredData.filter(i => i.status === "at-risk").length,
    behind: filteredData.filter(i => i.status === "behind").length,
    completed: filteredData.filter(i => i.status === "completed").length,
    avgProgress: Math.round(filteredData.reduce((sum, item) => sum + (item.progress / item.target * 100), 0) / filteredData.length) || 0
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
          <TrendingUp className="h-4 w-4" />
          متتبع التقدم الذكي
        </div>
        <h2 className="text-3xl font-bold">مراقبة تقدم الأهداف والمهام</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          تتبع مفصل لجميع أهدافك ومهامك مع رسوم بيانية تفاعلية وتحليلات ذكية
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">هذا الأسبوع</SelectItem>
              <SelectItem value="this-month">هذا الشهر</SelectItem>
              <SelectItem value="this-quarter">هذا الربع</SelectItem>
              <SelectItem value="this-year">هذا العام</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="مالي">مالي</SelectItem>
              <SelectItem value="صحي">صحي</SelectItem>
              <SelectItem value="منزلية">منزلية</SelectItem>
              <SelectItem value="تعليمي">تعليمي</SelectItem>
              <SelectItem value="شخصي">شخصي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="planning" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          تقرير مفصل
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{overallStats.totalItems}</div>
          <div className="text-xs text-muted-foreground">إجمالي العناصر</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-success">{overallStats.onTrack}</div>
          <div className="text-xs text-muted-foreground">في المسار</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-accent">{overallStats.atRisk}</div>
          <div className="text-xs text-muted-foreground">معرض للخطر</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-destructive">{overallStats.behind}</div>
          <div className="text-xs text-muted-foreground">متأخر</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">{overallStats.completed}</div>
          <div className="text-xs text-muted-foreground">مكتمل</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-secondary">{overallStats.avgProgress}%</div>
          <div className="text-xs text-muted-foreground">متوسط التقدم</div>
        </Card>
      </div>

      {/* Progress Items */}
      <div className="grid gap-6">
        {filteredData.map((item) => (
          <Card key={item.id} className="planning-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <Badge className={getStatusBadge(item.status)} variant="outline">
                      {getStatusText(item.status)}
                    </Badge>
                    <Badge variant="outline">
                      {item.type === "goal" ? "هدف" : item.type === "task" ? "مهمة" : "مشروع"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span>الفئة: {item.category}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {item.assignedTo.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      آخر تحديث: اليوم
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(item)}
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {Math.round((item.progress / item.target) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.progress.toLocaleString()} / {item.target.toLocaleString()} {item.unit}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">التقدم الحالي</span>
                  <span className={`text-sm font-bold ${getStatusColor(item.status)}`}>
                    {Math.round((item.progress / item.target) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(item.progress / item.target) * 100} 
                  className="h-3"
                />
              </div>

              {/* Weekly Progress Chart (Simplified) */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  التقدم الأسبوعي
                </h4>
                <div className="flex items-end gap-2 h-20">
                  {item.weeklyProgress.slice(-8).map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-gradient-primary rounded-t-sm transition-all duration-500"
                        style={{ 
                          height: `${(value / Math.max(...item.weeklyProgress)) * 60}px`,
                          minHeight: "4px"
                        }}
                      />
                      <div className="text-xs text-muted-foreground">
                        {index < 7 ? `س${index + 1}` : "الآن"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Progress */}
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-primary flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    الجدول الزمني
                  </div>
                  <div className="text-sm space-y-1">
                    <div>البداية: {item.startDate.toLocaleDateString('ar-SA')}</div>
                    <div>النهاية: {item.endDate.toLocaleDateString('ar-SA')}</div>
                    <div className="font-medium">
                      المدة المتبقية: {Math.ceil((item.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} يوم
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-secondary flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    معدل الإنجاز المطلوب
                  </div>
                  <div className="text-sm space-y-1">
                    <div>المعدل الحالي: {Math.round(item.progress / Math.max((Date.now() - item.startDate.getTime()) / (1000 * 60 * 60 * 24), 1))} {item.unit}/يوم</div>
                    <div>المعدل المطلوب: {Math.round(item.target / Math.max((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60 * 24), 1))} {item.unit}/يوم</div>
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
                {item.status === "completed" && (
                  <Button variant="success" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    مبروك الإنجاز!
                  </Button>
                )}
                {item.status === "behind" && (
                  <Button variant="warm" size="sm">
                    خطة تحسين
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Insights */}
      <Card className="planning-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            رؤى سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-success">نقاط القوة</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  {overallStats.onTrack} من الأهداف في المسار الصحيح
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  متوسط التقدم العام {overallStats.avgProgress}%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  التزام عالي بالمتابعة اليومية
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-accent">توصيات للتحسين</h4>
              <ul className="space-y-2 text-sm">
                {overallStats.behind > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    مراجعة الأهداف المتأخرة وضبط الخطة
                  </li>
                )}
                {overallStats.atRisk > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    زيادة الجهد في الأهداف المعرضة للخطر
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  تحديد مكافآت للأهداف المكتملة
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;