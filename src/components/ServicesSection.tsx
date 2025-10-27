import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Heart,
  MessageCircle,
  Target,
  Users,
  BookOpen,
} from "lucide-react";
import marriageIcon from "@/assets/marriage-icon.jpg";
import supportIcon from "@/assets/support-icon.jpg";
import planningIcon from "@/assets/planning-icon.jpg";

const ServicesSection = () => {
  const services = [
    {
      id: "marriage",
      title: " التوافق الشخصي",
      description:
        "خدمات وأدوات تساعدك على فهم نفسك، اختيار الشريك المناسب، وبناء علاقة صحية.",
      icon: marriageIcon,
      features: [
        "اختبارات التوافق الشخصي",
        "أدلة وخطوات لاختيار الشريك",
        "استشارات عائلية مباشرة",
        "محتوى توعوي متجدد",
      ],
      color: "primary",
      bgGradient: "bg-gradient-primary",
    },
    {
      id: "support",
      title: "خدمات الزواج والبيت",
      description: "أدوات عملية لإدارة الحياة الزوجية والبيت بعد الزواج.",
      icon: supportIcon,
      features: [
        "أدوات إدارة البيت",
        "تخطيط الميزانية العائلية",
        "ورش تدريبية تفاعلية",
        "مجتمع داعم للأسر",
        "اختيار قاعات الأفراح والصالونات",
      ],
      color: "accent",
      bgGradient: "bg-gradient-warm",
    },
    {
      id: "planning",
      title: "تخطيط الحياة المشتركة",
      description:
        "أدوات ذكية تساعد الزوجين في تنظيم أولوياتهم وتحقيق أهدافهم كعائلة",
      icon: planningIcon,
      features: [
        "تحديد الأهداف الذكية",
        "جدولة المهام العائلية",
        "متابعة التقدم",
        "تقارير دورية مفصلة",
      ],
      color: "secondary",
      bgGradient: "bg-secondary",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Target className="h-4 w-4" />
            خدماتنا المتميزة
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            محاور التمكين الثلاثة
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نقدم حلولاً شاملة لتمكين الأسر العربية من خلال ثلاثة محاور أساسية
            تغطي جميع جوانب الحياة الزوجية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="relative overflow-hidden group hover-lift shadow-soft hover:shadow-elegant transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />

              <CardHeader className="space-y-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-soft">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  onClick={() => {
                    const routes = {
                      marriage: "/marriage",
                      support: "/support",
                      planning: "/planning",
                    };
                    window.location.href =
                      routes[service.id as keyof typeof routes];
                  }}
                >
                 استكشف الخدمة 
                  <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg">
            احجز استشارة مجانية
            <Calendar className="h-5 w-5 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
