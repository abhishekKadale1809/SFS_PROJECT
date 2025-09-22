import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <a href="/" aria-label="Home" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">Success</span>
                <span className="text-sm font-semibold text-brand-secondary">Facility Services</span>
              </div>
            </a>
            <p className="text-gray-400 text-sm">
              Providing professional manpower supply services to industries with specialized security and facility management solutions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-brand-primary cursor-pointer transition-all duration-300 hover:scale-110" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-brand-primary cursor-pointer transition-all duration-300 hover:scale-110" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-brand-primary cursor-pointer transition-all duration-300 hover:scale-110" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-brand-primary cursor-pointer transition-all duration-300 hover:scale-110" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("footer.aboutUs")}</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("footer.ourServices")}</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("nav.gallery")}</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("nav.testimonials")}</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("nav.blog")}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("nav.faq")}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("footer.ourServices")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("servicesSection.securityCard.title")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">{t("servicesSection.facilityCard.title")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">Housekeeping Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">Labour Contract</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-secondary transition-all duration-300 hover:translate-x-1">Training Services</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("footer.contactUs")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-secondary mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  Sr.No. 358, Wipro Circle, Phase 2, Hinjewadi, Man, Mulshi, Pune, 411057
                </p>
              </div>
              <a href="tel:+919890273333" className="flex items-center space-x-2 group">
                <Phone className="w-4 h-4 text-brand-secondary" />
                <span className="text-gray-400 group-hover:text-white transition-colors">+91 9890273333</span>
              </a>
              <a href="mailto:succesfacility9922@gmail.com" className="flex items-center space-x-2 group">
                <Mail className="w-4 h-4 text-brand-secondary" />
                <span className="text-gray-400 group-hover:text-white transition-colors">succesfacility9922@gmail.com</span>
              </a>
            </div>
            
            {/* Registrations */}
            <div className="pt-4">
              <h4 className="font-medium mb-2">{t("footer.registrations")}</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1 rounded-full text-white font-medium shadow-sm">PSARA</span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1 rounded-full text-white font-medium shadow-sm">EPF</span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1 rounded-full text-white font-medium shadow-sm">ESIC</span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1 rounded-full text-white font-medium shadow-sm">PT</span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary px-3 py-1 rounded-full text-white font-medium shadow-sm">GST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Success Facility Services. All rights reserved. | Clean & Clear</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
