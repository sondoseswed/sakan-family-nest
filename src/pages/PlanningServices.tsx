import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Target,
  Calendar,
  TrendingUp,
  CheckCircle,
  BarChart3,
  FileText,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SmartGoalsTool from "@/components/planning/SmartGoalsTool";
import FamilyTaskScheduler from "@/components/planning/FamilyTaskScheduler";
import ProgressTracker from "@/components/planning/ProgressTracker";
import ReportsGenerator from "@/components/planning/ReportsGenerator";

const PlanningServices = () => {
  const [activeTab, setActiveTab] = useState("goals");

  const planningTools = [
    {
      id: "goals",
      title: "تحديد الأهداف الذكية",
      description: "أداة متقدمة لتحديد وصياغة الأهداف الأسرية بطريقة SMART",
      icon: Target,
      color: "primary",
    },
    {
      id: "tasks",
      title: "جدولة المهام العائلية",
      description: "نظام ذكي لتنظيم وتوزيع المهام اليومية والأسبوعية",
      icon: Calendar,
      color: "secondary",
    },
    {
      id: "progress",
      title: "متتبع التقدم",
      description: "لوحة تحكم شاملة لمتابعة تقدم الأهداف والمهام العائلية",
      icon: TrendingUp,
      color: "accent",
    },
    {
      id: "reports",
      title: "مولد التقارير",
      description: "تقارير دورية مفصلة عن إنجازات الأسرة وخطط التطوير",
      icon: FileText,
      color: "warm",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft" dir="rtl">
      <Header />

      <div className="bg-gradient-hero text-primary-foreground" dir="rtl">
        <div className="container px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              أدوات التخطيط المتقدمة
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              خطط لمستقبل أسري مشرق
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              مجموعة شاملة من الأدوات الذكية لمساعدة الأسر في التخطيط والتنظيم
              وتحقيق الأهداف
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                onClick={() => (window.location.href = "/")}
                className="shadow-elegant"
              >
                {/* <Home className="h-5 w-5 mr-2" /> */}
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        {/* Tools Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
          dir="rtl"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-2 bg-card shadow-soft">
            {planningTools.map((tool) => (
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-elegant transition-all duration-300"
              >
                <tool.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{tool.title}</div>
                  <div className="text-xs opacity-70 hidden md:block">
                    {tool.description}
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tools Content */}
          <div className="min-h-[600px]">
            <TabsContent value="goals" className="space-y-6">
              <div className="flex justify-center mb-6">
                <Button
                  variant="planning"
                  size="lg"
                  onClick={() => (window.location.href = "/planning/goals")}
                  className="shadow-elegant hover:scale-105"
                >
                  <Target className="h-5 w-5 mr-2" />
                  فتح أداة الأهداف في صفحة منفصلة
                </Button>
              </div>
              <SmartGoalsTool />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <div className="flex justify-center mb-6">
                <Button
                  variant="planning"
                  size="lg"
                  onClick={() => (window.location.href = "/planning/tasks")}
                  className="shadow-elegant hover:scale-105"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  فتح جدولة المهام في صفحة منفصلة
                </Button>
              </div>
              <FamilyTaskScheduler />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="flex justify-center mb-6">
                <Button
                  variant="planning"
                  size="lg"
                  onClick={() => (window.location.href = "/planning/progress")}
                  className="shadow-elegant hover:scale-105"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  فتح متتبع التقدم في صفحة منفصلة
                </Button>
              </div>
              <ProgressTracker />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-center mb-6">
                <Button
                  variant="planning"
                  size="lg"
                  onClick={() => (window.location.href = "/planning/reports")}
                  className="shadow-elegant hover:scale-105"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  فتح مولد التقارير في صفحة منفصلة
                </Button>
              </div>
              <ReportsGenerator />
            </TabsContent>
          </div>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4 hover-lift shadow-soft">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">أسرة مستفيدة</div>
          </Card>
          <Card className="text-center p-4 hover-lift shadow-soft">
            <div className="text-2xl font-bold text-success">2000+</div>
            <div className="text-sm text-muted-foreground">هدف محقق</div>
          </Card>
          <Card className="text-center p-4 hover-lift shadow-soft">
            <div className="text-2xl font-bold text-accent">85%</div>
            <div className="text-sm text-muted-foreground">معدل النجاح</div>
          </Card>
          <Card className="text-center p-4 hover-lift shadow-soft">
            <div className="text-2xl font-bold text-secondary">4.9</div>
            <div className="text-sm text-muted-foreground">
              تقييم المستخدمين
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlanningServices;
