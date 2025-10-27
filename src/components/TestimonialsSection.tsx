import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "أحمد و سارة",
      location: "عمان",
      content: "تطبيق سكن غير حياتنا تماماً. ساعدنا في فهم بعضنا البعض أكثر وتحسين تواصلنا. الاستشارات كانت مفيدة جداً ومناسبة لثقافتنا العربية.",
      rating: 5,
      category: "الدعم الاستشاري"
    },
    {
      name: "محمد و لينا",
      location: "إربد",
      content: "أدوات التخطيط المالي والعائلي رائعة. استطعنا تنظيم أهدافنا وتحقيق حلم السكن الخاص بنا في وقت أقل مما توقعنا.",
      rating: 5,
      category: "تخطيط الحياة"
    },
    {
      name: "يوسف  و فرح",
      location: "العقبة",
      content: "اختبارات التوافق ساعدتنا في فهم شخصياتنا وتقوية علاقتنا. المحتوى التوعوي مفيد جداً ومعروض بطريقة جميلة ومفهومة.",
      rating: 5,
      category: "خدمات الزواج"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            آراء عملائنا
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            قصص نجاح حقيقية
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اكتشف كيف ساعد تطبيق سكن الأسر العربية في بناء حياة زوجية أكثر استقراراً وسعادة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover-lift shadow-soft hover:shadow-warm transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -right-2" />
                  <p className="text-muted-foreground leading-relaxed relative z-10 pr-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-xs text-primary font-medium mt-1 bg-primary/10 px-2 py-1 rounded-full inline-block">
                    {testimonial.category}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;