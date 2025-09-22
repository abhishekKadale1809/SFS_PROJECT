import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, Phone, Mail, Shield, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const rawPhone = t("header.phone");
  const phoneDigits = (rawPhone || "").replace(/\D/g, "");
  const waMessage = "Hello, I am interested in connecting with Success Facility Services. Thank you!";
  const waUrl = `https://wa.me/91${phoneDigits}?text=${encodeURIComponent(waMessage)}`;

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "gallery", href: "#gallery" },
    { key: "testimonials", href: "#testimonials" },
    { key: "blog", href: "#blog" },
    { key: "faq", href: "#faq" },
    { key: "contact", href: "#contact" }
  ];

  const changeLanguage = (lng: "en" | "hi" | "mr") => {
    i18n.changeLanguage(lng);
    try { localStorage.setItem("lang", lng); } catch {}
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Enhanced Professional Logo */}
        <a href="/" aria-label="Home" className="flex items-center space-x-3">
          <div className="relative group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg hover-lift">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-20 transition-opacity animate-pulse-glow"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900 tracking-tight">Success</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Facility Services
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-brand-primary transition-all duration-300 hover:scale-105 relative group"
            >
              {t(`nav.${item.key}`)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <Select value={i18n.language} onValueChange={(v) => changeLanguage(v as any)}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder={t("language.label")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t("language.en")}</SelectItem>
                <SelectItem value="hi">{t("language.hi")}</SelectItem>
                <SelectItem value="mr">{t("language.mr")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </nav>

        {/* Contact Info & CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={`tel:+91${phoneDigits}`}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-brand-primary transition-colors"
            aria-label={`Call: +91 ${t("header.phone")}`}
          >
            <Phone className="w-4 h-4" />
            <span>+91 {t("header.phone")}</span>
          </a>
          <Button asChild className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-dark hover:to-brand-secondary text-white shadow-lg hover-lift">
            <a href={waUrl} target="_blank" rel="noopener noreferrer">{t("header.getQuote")}</a>
          </Button>
        </div>


        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-6 mt-6">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-lg font-medium text-gray-700 hover:text-brand-primary transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <Select value={i18n.language} onValueChange={(v) => changeLanguage(v as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("language.label")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t("language.en")}</SelectItem>
                      <SelectItem value="hi">{t("language.hi")}</SelectItem>
                      <SelectItem value="mr">{t("language.mr")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <a
                  href={`tel:+91${phoneDigits}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
                  aria-label={`Call: +91 ${t("header.phone")}`}
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 {t("header.phone")}</span>
                </a>
                <a
                  href="mailto:succesfacility9922@gmail.com"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
                  aria-label="Email: succesfacility9922@gmail.com"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail className="w-4 h-4" />
                  <span>succesfacility9922@gmail.com</span>
                </a>
                <Button asChild className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-dark hover:to-brand-secondary text-white shadow-lg">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">{t("header.getQuote")}</a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
