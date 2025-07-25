import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Star
} from "lucide-react";

const PlanningServices = () => {
  const planningTools = [
    {
      title: "تحديد الأهداف الذكية",
      description: "أداة متقدمة لتحديد وصياغة الأهداف الأسرية بطريقة SMART",
      icon: Target,
      features: ["أهداف قصيرة المدى", "أهداف طويلة المدى", "قياس التقدم", "تحديثات دورية"],
      category: "التخطيط"
    },
    {
      title: "جدولة المهام العائلية",
      description: "نظام ذكي لتنظيم وتوزيع المهام اليومية والأسبوعية بين أفراد الأسرة",
      icon: Calendar,
      features: ["تقويم مشترك", "تذكيرات تلقائية", "توزيع المسؤوليات", "متابعة الإنجاز"],
      category: "التنظيم"
    },
    {
      title: "متتبع التقدم",
      description: "لوحة تحكم شاملة لمتابعة تقدم الأهداف والمهام العائلية",
      icon: TrendingUp,
      features: ["رسوم بيانية", "إحصائيات مفصلة", "تقارير شهرية", "نصائح تحسين"],
      category: "المتابعة"
    },
    {
      title: "مولد التقارير",
      description: "تقارير دورية مفصلة عن إنجازات الأسرة وخطط التطوير",
      icon: FileText,
      features: ["تقارير أسبوعية", "تحليل الإنجازات", "اقتراحات التحسين", "مشاركة التقارير"],
      category: "التقييم"
    }
  ];

  const benefits = [
    {
      title: "زيادة الإنتاجية",
      description: "تحسين في معدل إنجاز المهام بنسبة 85%",
      percentage: 85
    },
    {
      title: "تحسين التواصل",
      description: "تحسن ملحوظ في التواصل الأسري",
      percentage: 92
    },
    {
      title: "تحقيق الأهداف",
      description: "نجاح في تحقيق الأهداف المحددة",
      percentage: 78
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              تخطيط الحياة المشتركة
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              خطط لمستقبل{" "}
              <span className="text-secondary">أسري</span>{" "}
              مشرق
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              أدوات ذكية ومتقدمة تساعد الأسر في تنظيم أولوياتها وتحديد أهدافها 
              ومتابعة تقدمها نحو تحقيق حياة أفضل وأكثر تنظيماً
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                ابدأ التخطيط الآن
                <Target className="h-5 w-5 mr-2" />
              </Button>
              <Button variant="outline" size="lg">
                شاهد العرض التوضيحي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Planning Tools */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              أدوات التخطيط المتقدمة
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              مجموعة شاملة من الأدوات المصممة لمساعدة الأسر في التخطيط والتنظيم
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {planningTools.map((tool, index) => (
              <Card key={index} className="hover-lift shadow-soft hover:shadow-warm transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <tool.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {tool.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                    استخدم الأداة
                    <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Statistics */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  نتائج مثبتة وقابلة للقياس
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  أدوات التخطيط في سكن حققت نتائج مذهلة للأسر المستخدمة، 
                  مما يؤكد فعاليتها في تحسين جودة الحياة الأسرية.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{benefit.title}</span>
                      <span className="text-sm font-bold text-secondary">{benefit.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-secondary to-primary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${benefit.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <Button variant="default" size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                ابدأ رحلة التخطيط
                <Calendar className="h-5 w-5 mr-2" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover-lift shadow-soft">
                <BarChart3 className="h-12 w-12 text-secondary mx-auto mb-4" />
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-muted-foreground">أسرة مستفيدة</div>
              </Card>
              <Card className="p-6 text-center hover-lift shadow-soft">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-muted-foreground">هدف محقق</div>
              </Card>
              <Card className="p-6 text-center hover-lift shadow-soft">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-accent">75%</div>
                <div className="text-muted-foreground">توفير في الوقت</div>
              </Card>
              <Card className="p-6 text-center hover-lift shadow-soft">
                <Star className="h-12 w-12 text-secondary mx-auto mb-4" />
                <div className="text-3xl font-bold text-secondary">4.9</div>
                <div className="text-muted-foreground">تقييم المستخدمين</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              كيف تبدأ التخطيط؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              خطوات بسيطة وفعالة للبدء في تخطيط حياة أسرية منظمة ومثمرة
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "تحديد الرؤية", desc: "ابدأ بتحديد رؤيتكم المشتركة للمستقبل" },
              { step: "02", title: "وضع الأهداف", desc: "حدد أهدافاً واقعية وقابلة للقياس" },
              { step: "03", title: "وضع الخطة", desc: "ضع خطة عمل مفصلة لتحقيق الأهداف" },
              { step: "04", title: "المتابعة", desc: "راقب التقدم وعدل الخطة حسب الحاجة" }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 hover-lift shadow-soft">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-secondary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanningServices;