import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Globe, 
  Clock, 
  Users, 
  BookOpen, 
  MessageSquare,
  Target,
  Award
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "أمان وخصوصية",
      description: "حماية كاملة لبياناتك الشخصية مع التزام تام بالخصوصية",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "محتوى عربي أصيل",
      description: "محتوى مصمم خصيصاً للثقافة العربية والإسلامية",
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "متاح 24/7",
      description: "خدمات متاحة على مدار الساعة لدعمك في أي وقت",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "مستشارون معتمدون",
      description: "فريق من الخبراء المتخصصين في الاستشارات الأسرية",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "محتوى تعليمي ثري",
      description: "مكتبة شاملة من المقالات والفيديوهات التوعوية",
      color: "text-secondary"
    },
    {
      icon: MessageSquare,
      title: "تواصل مباشر",
      description: "إمكانية التواصل المباشر مع المستشارين عبر المنصة",
      color: "text-accent"
    },
    {
      icon: Target,
      title: "أهداف قابلة للقياس",
      description: "أدوات لتحديد ومتابعة الأهداف الأسرية بطريقة منهجية",
      color: "text-primary"
    },
    {
      icon: Award,
      title: "شهادات وإنجازات",
      description: "نظام مكافآت لتشجيع التقدم والإنجازات العائلية",
      color: "text-secondary"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            مميزات المنصة
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold">
            لماذا تختار سكن؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            مميزات تجعل من سكن الخيار الأمثل للأسر العربية الساعية للتطوير والنمو
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover-lift shadow-soft hover:shadow-warm transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;