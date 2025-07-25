import { Button } from "@/components/ui/button";
import { Heart, Menu, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              سكن
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/marriage" className="text-muted-foreground hover:text-primary transition-smooth">
            خدمات الزواج
          </a>
          <a href="/support" className="text-muted-foreground hover:text-primary transition-smooth">
            الدعم الاستشاري
          </a>
          <a href="/planning" className="text-muted-foreground hover:text-primary transition-smooth">
            تخطيط الحياة
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="h-4 w-4" />
            تسجيل الدخول
          </Button>
          <Button variant="hero" size="sm" className="hidden md:flex">
            ابدأ الآن
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;