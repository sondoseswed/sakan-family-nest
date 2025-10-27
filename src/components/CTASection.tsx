import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, MessageCircle, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container px-4">
        <Card className="relative overflow-hidden shadow-elegant">
          <div className="absolute inset-0 bg-gradient-hero opacity-95" />
          <div className="relative z-10 p-12 md:p-20 text-center text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                ابدأ رحلتك نحو حياة أسرية أفضل
              </h2>
              <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
                انضم إلى آلاف الأسر العربية التي اختارت سكن لبناء مستقبل أفضل.
                احصل على استشارة مجانية واكتشف كيف يمكننا مساعدتك
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="secondary"
                size="xl"
                className="text-lg font-semibold"
              >
                <Calendar className="h-6 w-6 ml-2" />
                احجز استشارة مجانية
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="text-lg font-semibold border-white text-white  bg-white text-primary"
              >
                <MessageCircle className="h-6 w-6 ml-2" />
                تحدث مع مستشار
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <div className="space-y-2">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-lg opacity-90">دعم متواصل</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">مجاني</div>
                <div className="text-lg opacity-90">الاستشارة الأولى</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">محلي</div>
                <div className="text-lg opacity-90">مناسب للثقافة العربية</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
