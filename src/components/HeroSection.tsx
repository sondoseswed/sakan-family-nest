import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Home, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero.png";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartWeddingPlanning = () => {
    navigate("/wedding-planning");
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  سكن
                </span>{" "}
                <br />
                <div className="mt-3">
                  تمكين الأمة من خلال{" "}
                  <span className="text-secondary">الأسرة</span>
                </div>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                تخطيط الزفاف الذكي لتسهيل تنظيم يومك الكبير وتقليل أي مشاكل أو
                توتر محتمل
              </p>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg">
                ابدأ رحلتك معنا
                <ArrowRight className="h-5 w-5 mr-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg"
                onClick={() => {
                  const el = document.getElementById("services");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                اكتشف خدماتنا 
              </Button>
            </div> */}

            {/* Prominent Wedding Planning Button */}
            <div className="flex justify-right pt-6">
              <Button
                onClick={handleStartWeddingPlanning}
                size="lg"
                variant="hero"
                className="relative text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 overflow-hidden"
              >
                {/* subtle pulsing glow */}
                <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-primary/20 blur-xl opacity-30 animate-pulse" />

                <Sparkles className="h-5 w-5 ml-3 opacity-90 animate-spin" style={{ animationDuration: "8s" }} />
                ابدأ تخطيط حفل الزفاف
                <Sparkles className="h-5 w-5 mr-3 opacity-90 animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <Card className="p-4 text-center space-y-2 hover-lift shadow-soft">
                <Home className="h-8 w-8 text-primary mx-auto" />
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">أسرة سعيدة</div>
              </Card>
              <Card className="p-4 text-center space-y-2 hover-lift shadow-soft">
                <Users className="h-8 w-8 text-secondary mx-auto" />
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">
                  مستشار متخصص
                </div>
              </Card>
              <Card className="p-4 text-center space-y-2 hover-lift shadow-soft">
                <Heart className="h-8 w-8 text-accent mx-auto" />
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-sm text-muted-foreground">سنوات خبرة</div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage}
                alt="أسرة عربية سعيدة"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-warm p-6 rounded-2xl shadow-warm max-w-xs">
              <div className="text-white">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">معدل رضا العملاء</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
