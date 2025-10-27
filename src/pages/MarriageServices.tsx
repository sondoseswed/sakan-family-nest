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
  Heart,
  Users,
  Calculator,
  Home,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
} from "lucide-react";

const MarriageServices = () => {
  const tools = [
    {
      id: "personal-compatibility",
      title: "اختبار التوافق الشخصي",
      description:
        "اكتشف مدى التوافق مع شريكك المحتمل من خلال اختبارات علمية مدروسة",
      icon: Heart,
      features: [
        "تحليل الشخصية",
        "توافق الاهتمامات",
        "القيم المشتركة",
        "أهداف الحياة",
      ],
      status: "قريباً",
    },
    {
      id: "partner-guide",
      title: "دليل اختيار الشريك",
      description:
        "دليل شامل يساعدك في اتخاذ قرارات صحيحة عند اختيار شريك الحياة",
      icon: Users,
      features: [
        "معايير الاختيار",
        "أسئلة مهمة",
        "علامات التحذير",
        "نصائح الخبراء",
      ],
      status: "قريباً",
    },
    {
      id: "smart-home-management",
      title: "إدارة البيت الذكية",
      description: "أدوات تساعدك في تنظيم وإدارة شؤون البيت والحياة المشتركة",
      icon: Home,
      features: [
        "جدولة المهام",
        "توزيع المسؤوليات",
        "قوائم التسوق",
        "تذكيرات ذكية",
      ],
      status: "قريباً",
    },
    {
      id: "family-budget-planner",
      title: "مخطط الميزانية العائلية",
      description: "أدوات متقدمة لتخطيط وإدارة الميزانية المالية للأسرة",
      icon: Calculator,
      features: [
        "تتبع المصروفات",
        "التخطيط للمستقبل",
        "أهداف الادخار",
        "تقارير مالية",
      ],
      status: "قريباً",
    },
  ];

  const benefits = [
    "تحسين جودة العلاقة الزوجية",
    "اتخاذ قرارات مدروسة ومتوازنة",
    "بناء أساس قوي للحياة المشتركة",
    "تجنب المشاكل الشائعة في بداية الزواج",
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              خدمات الزواج والبيت
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              أدوات ذكية لبناء{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                حياة زوجية
              </span>{" "}
              سعيدة
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              مجموعة شاملة من الأدوات والاختبارات التي تساعدك في اختيار الشريك
              المناسب وبناء أساس قوي لحياة زوجية مستقرة وسعيدة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                ابدأ الاختبار المجاني
                <ArrowRight className="h-5 w-5 mr-2" />
              </Button>
              <Button variant="outline" size="lg">
                استشر خبير
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              أدوات متخصصة لرحلتك
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              أدوات مصممة خصيصاً لمساعدتك في كل مرحلة من مراحل بناء الأسرة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="hover-lift shadow-soft hover:shadow-warm transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <Badge
                          variant={
                            tool.status === "متاح" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {tool.status}
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
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant={tool.status === "متاح" ? "default" : "secondary"}
                    className="w-full"
                    disabled={tool.status !== "متاح"}
                    onClick={() => {
                      const routes = {
                        "personal-compatibility": "/personal-compatibility",
                        "partner-guide": "/partner-guide",
                        "smart-home-management": "/smart-home-management",
                        "family-budget-planner": "/family-budget-planner",
                      };
                      window.location.href = routes[tool.id];
                    }}
                  >
                    {tool.status === "متاح" ? "استخدم الأداة" : "قريباً"}
                    {tool.status === "متاح" && (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                لماذا تحتاج هذه الأدوات؟
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                في عصر تتزايد فيه تحديات الحياة الزوجية، تصبح الحاجة للإعداد
                المسبق والتخطيط الذكي أمراً ضرورياً لضمان نجاح العلاقة
                واستقرارها.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg">
                احجز جلسة استشارية
                <Target className="h-5 w-5 mr-2" />
              </Button>
            </div>
            <Card className="p-8 shadow-elegant bg-gradient-to-br from-card to-card/50">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-lg font-medium">معدل نجاح</div>
                  <div className="text-muted-foreground">
                    من الأزواج الذين استخدموا أدواتنا
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground italic">
                    "أدوات سكن ساعدتنا في فهم بعضنا البعض قبل الزواج والآن نعيش
                    حياة مستقرة وسعيدة بفضل التخطيط المسبق"
                  </p>
                  <div className="text-xs text-primary font-medium mt-2">
                    - أحمد وفاطمة
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarriageServices;
