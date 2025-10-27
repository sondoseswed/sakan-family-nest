import { Button } from "@/components/ui/button";
import { Heart, Menu, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container grid grid-cols-3 h-16 items-center">
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/marriage"
            className="text-muted-foreground hover:text-primary transition-smooth"
          >
            خدمات الزواج
          </a>
          <a
            href="/support"
            className="text-muted-foreground hover:text-primary transition-smooth"
          >
            الدعم الاستشاري
          </a>
          <a
            href="/planning"
            className="text-muted-foreground hover:text-primary transition-smooth"
          >
            تخطيط الحياة
          </a>
        </nav>

        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="group flex items-center gap-3 translate-y-1"
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            <div className="relative">
              <img
                src={logo}
                alt="شعار سكن"
                className="h-25 w-20 object-contain select-none"
                draggable={false}
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 justify-self-end">
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
