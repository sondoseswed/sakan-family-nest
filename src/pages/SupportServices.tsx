import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MessageCircle, 
  BookOpen, 
  Users, 
  Video, 
  Clock, 
  Award,
  ArrowRight,
  Phone,
  Calendar
} from "lucide-react";

const SupportServices = () => {
  const supportTypes = [
    {
      title: "استشارات فردية",
      description: "جلسات استشارية خاصة مع مختصين في العلاقات الأسرية",
      icon: MessageCircle,
      duration: "60 دقيقة",
      price: "150 ريال",
      features: ["خصوصية تامة", "مرونة في المواعيد", "متابعة شخصية", "خطة علاجية"]
    },
    {
      title: "استشارات زوجية",
      description: "جلسات مشتركة للأزواج لحل المشاكل وتحسين التواصل",
      icon: Users,
      duration: "90 دقيقة", 
      price: "200 ريال",
      features: ["حلول عملية", "تحسين التواصل", "إدارة الخلافات", "تقوية الرابطة"]
    },
    {
      title: "ورش تدريبية",
      description: "ورش جماعية تفاعلية حول مواضيع أسرية متنوعة",
      icon: Video,
      duration: "3 ساعات",
      price: "مجاني",
      features: ["تفاعل جماعي", "خبرات متنوعة", "أنشطة عملية", "شهادة حضور"]
    }
  ];

  const contentCategories = [
    {
      title: "إدارة العلاقات",
      articles: 25,
      topics: ["التواصل الفعال", "حل الخلافات", "بناء الثقة", "التعبير عن المشاعر"]
    },
    {
      title: "التربية الإيجابية",
      articles: 18,
      topics: ["أساليب التربية", "التعامل مع المراحل العمرية", "القدوة الحسنة", "التحفيز"]
    },
    {
      title: "الصحة النفسية",
      articles: 22,
      topics: ["إدارة الضغوط", "التوازن النفسي", "الثقة بالنفس", "الاسترخاء"]
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-accent/5 to-secondary/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              الدعم الاجتماعي والاستشاري
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              دعم متخصص لكل{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                أسرة
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              فريق من الخبراء المتخصصين في الاستشارات الأسرية والنفسية يقدم لك الدعم 
              والتوجيه اللازم لحل التحديات وبناء علاقات أسرية صحية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="warm" size="lg">
                احجز استشارة فورية
                <Phone className="h-5 w-5 mr-2" />
              </Button>
              <Button variant="outline" size="lg">
                تصفح المحتوى التوعوي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              أنواع الدعم المتاحة
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              اختر نوع الدعم المناسب لحالتك واحتياجاتك الشخصية
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {supportTypes.map((type, index) => (
              <Card key={index} className="hover-lift shadow-soft hover:shadow-warm transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-warm" />
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mb-4">
                    <type.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{type.duration}</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{type.price}</div>
                  </div>
                  
                  <ul className="space-y-2">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="default" className="w-full">
                    احجز الآن
                    <Calendar className="h-4 w-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Library */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              مكتبة المحتوى التوعوي
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              مئات المقالات والفيديوهات التوعوية المتخصصة في مجال الأسرة والعلاقات
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contentCategories.map((category, index) => (
              <Card key={index} className="hover-lift shadow-soft hover:shadow-warm transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-secondary" />
                    <Badge variant="secondary">{category.articles} مقال</Badge>
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {category.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    استكشف المحتوى
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              فريق الخبراء المتخصصين
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نخبة من أفضل المختصين في مجال الاستشارات الأسرية والنفسية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <Card className="p-6 hover-lift shadow-soft">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-muted-foreground">سنة خبرة متوسطة</div>
            </Card>
            <Card className="p-6 hover-lift shadow-soft">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <div className="text-2xl font-bold text-secondary">50+</div>
              <div className="text-muted-foreground">مستشار متخصص</div>
            </Card>
            <Card className="p-6 hover-lift shadow-soft">
              <MessageCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-2xl font-bold text-accent">5000+</div>
              <div className="text-muted-foreground">جلسة استشارية</div>
            </Card>
            <Card className="p-6 hover-lift shadow-soft">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">دعم متواصل</div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SupportServices;