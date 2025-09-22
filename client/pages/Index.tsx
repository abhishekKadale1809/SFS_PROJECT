import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Award,
  Clock,
  Target,
  Eye,
  Briefcase,
  UserCheck,
  Building,
  Headphones,
  TrendingUp,
  Zap,
  Globe
} from "lucide-react";

export default function Index() {
  const { toast } = useToast();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});
  const [showSecVideo, setShowSecVideo] = useState(false);
  const [showHkVideo, setShowHkVideo] = useState(false);
  const secRef = useRef<HTMLDivElement | null>(null);
  const hkRef = useRef<HTMLDivElement | null>(null);

  const [counters, setCounters] = useState({
    clients: 0,
    experience: 0,
    projects: 0
  });

  // Housekeeping combined short video (2 clips x 5s)
  useEffect(() => {
    if (!showHkVideo) return;
    const mount = document.getElementById("hk-video-player");
    if (!mount) return;
    const w = window as any;
    let player: any;
    let switchTimer: any;
    const vids = ["00f-IbdsoX0", "L5dPqH9WO5o"]; // YouTube shorts IDs
    let idx = 0;

    const schedule = () => {
      clearTimeout(switchTimer);
      switchTimer = setTimeout(() => {
        idx = (idx + 1) % vids.length;
        if (player && player.loadVideoById) {
          player.loadVideoById({ videoId: vids[idx], startSeconds: 0, endSeconds: 5, suggestedQuality: "hd1080" });
        }
        schedule();
      }, 5000);
    };

    const create = () => {
      player = new w.YT.Player("hk-video-player", { height: "100%", width: "100%",
        videoId: vids[0],
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, rel: 0, playsinline: 1,
          modestbranding: 1, iv_load_policy: 3, fs: 0, start: 0, end: 5, showinfo: 0, cc_load_policy: 0
        },
        events: {
          onReady: () => { try { player.mute(); player.playVideo(); } catch {} schedule(); }
        }
      });
    };

    const ensureApi = () => {
      if (w.YT && w.YT.Player) return create();
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
      w.onYouTubeIframeAPIReady = () => create();
    };

    ensureApi();
    return () => { clearTimeout(switchTimer); try { player?.destroy?.(); } catch {} };
  }, [showHkVideo]);

  // Animated counters effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          clients: Math.min(prev.clients + 15, 500),
          experience: Math.min(prev.experience + 1, 10),
          projects: Math.min(prev.projects + 8, 150)
        }));
      }, 30);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Defer video loading until near viewport and respect data-saver / reduced motion
  useEffect(() => {
    const conn: any = (navigator as any).connection || {};
    const saveData = !!conn.saveData;
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canAutoPlay = !(saveData || reduced);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (e.target === secRef.current) setShowSecVideo(canAutoPlay);
          if (e.target === hkRef.current) setShowHkVideo(canAutoPlay);
          io.unobserve(e.target as Element);
        }
      });
    }, { rootMargin: '100px 0px' });
    if (secRef.current) io.observe(secRef.current);
    if (hkRef.current) io.observe(hkRef.current);
    return () => io.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setFormData({ name: "", email: "", phone: "", message: "" });
      toast({ title: t("toast.enquirySentTitle"), description: t("toast.enquirySentDesc") });
    } catch (err) {
      console.error(err);
      toast({ title: t("toast.submissionFailedTitle"), description: t("toast.submissionFailedDesc"), variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section with Background Image */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/8591606/pexels-photo-8591606.jpeg"
            alt="Professional Security Guard"
            className="w-full h-full object-cover"
            loading="eager" fetchpriority="high" decoding="async" sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/85 to-brand-primary/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/50 to-transparent"></div>
        </div>

        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-brand-secondary to-brand-accent text-white border-0 hover-lift">
                  <Shield className="w-4 h-4 mr-2" />
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
                  {t("hero.title.prefix")} <span className="gradient-text bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">{t("hero.title.security")}</span> {t("hero.title.and")}
                  <span className="gradient-text bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent"> {t("hero.title.facility")}</span> {t("hero.title.services")}
                </h1>
                <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-brand-secondary to-brand-accent hover:from-brand-secondary hover:to-brand-accent text-white shadow-2xl hover-lift transform hover:scale-105 transition-all duration-300">
                  <Shield className="mr-2 w-5 h-5" />
                  {t("hero.cta.getFreeQuote")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <a
                  href={`tel:+91${t("header.phone")}`}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-brand-navy font-semibold shadow-xl hover:shadow-2xl border border-white/80"
                  aria-label={t("hero.cta.call", { number: t("header.phone") })}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  {t("hero.cta.call", { number: t("header.phone") })}
                </a>
              </div>

              {/* Animated Statistics */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center animate-scale-in">
                  <div className="text-4xl font-bold text-brand-secondary mb-1">{counters.clients}+</div>
                  <div className="text-sm text-gray-300 font-medium">{t("hero.stats.clients")}</div>
                </div>
                <div className="text-center animate-scale-in" style={{animationDelay: '0.2s'}}>
                  <div className="text-4xl font-bold text-brand-accent mb-1">24/7</div>
                  <div className="text-sm text-gray-300 font-medium">{t("hero.stats.coverage")}</div>
                </div>
                <div className="text-center animate-scale-in" style={{animationDelay: '0.4s'}}>
                  <div className="text-4xl font-bold text-white mb-1">{counters.experience}+</div>
                  <div className="text-sm text-gray-300 font-medium">{t("hero.stats.years")}</div>
                </div>
              </div>
            </div>

            {/* Enhanced Service Cards */}
            <div className="relative animate-slide-up">
              <div className="relative z-10 glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-effect rounded-2xl p-6 hover-lift group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-secondary to-brand-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{t("servicesSection.securityCard.title")}</h3>
                    <p className="text-sm text-gray-300">{t("servicesSection.securityCard.desc")}</p>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-6 hover-lift group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{t("servicesSection.facilityCard.title")}</h3>
                    <p className="text-sm text-gray-300">{t("servicesSection.facilityCard.desc")}</p>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-6 hover-lift group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{t("highlights.trainedTitle")}</h3>
                    <p className="text-sm text-gray-300">{t("highlights.trainedDesc")}</p>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-6 hover-lift group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Headphones className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{t("highlights.supportTitle")}</h3>
                    <p className="text-sm text-gray-300">{t("highlights.supportDesc")}</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Animation Elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-brand-secondary/30 to-brand-accent/30 rounded-full animate-float"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced About Us Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white mb-6 text-lg px-6 py-2">
              {t("about.badge")}
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              {t("about.heading").split(" ")[0]} & {t("about.heading").split(" ")[1]} <span className="gradient-text">{t("about.heading").split(" ")[2]}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-slide-up">
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("about.mission.title")}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {t("about.mission.text")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("about.vision.title")}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {t("about.vision.text")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("about.values.title")}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {t("about.values.text")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift border border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">PSARA</div>
                  <div className="text-sm text-gray-600 font-medium mt-2">{t("about.registrations.psara")}</div>
                </div>
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift border border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">EPF</div>
                  <div className="text-sm text-gray-600 font-medium mt-2">{t("about.registrations.epf")}</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-8">{t("about.why.title")}</h3>
                <ul className="space-y-6">
                  {(t("about.why.points", { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-center space-x-4 group">
                      <CheckCircle className="w-7 h-7 text-brand-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section with HD Images */}
      <section id="services" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-accent to-brand-secondary text-white mb-6 text-lg px-6 py-2">
              {t("servicesSection.badge")}
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              <Trans i18nKey="servicesSection.heading">Comprehensive <span className="gradient-text">Security & Facility</span> Solutions</Trans>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("servicesSection.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Security Services with HD Image */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover-lift overflow-hidden group">
              <div ref={secRef} className="relative h-80 md:h-96 overflow-hidden">
                {showSecVideo ? (
                  <iframe
                    className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] pointer-events-none"
                    src="https://www.youtube-nocookie.com/embed/BXm2YBJlPZw?autoplay=1&mute=1&controls=0&loop=1&playlist=BXm2YBJlPZw&modestbranding=1&rel=0&start=0&end=10&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&origin=${location.origin}"
                    title="Security Services Video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                ) : (
                  <>
                    <img
                      src="https://images.pexels.com/photos/19317897/pexels-photo-19317897.jpeg"
                      alt="Modern Security Control Room"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 text-white backdrop-blur-[1px]"
                      aria-label="Play security video"
                    >
                      <span className="inline-block rounded-full bg-white/90 text-black px-4 py-2 font-semibold">Play</span>
                    </button>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <Shield className="w-10 h-10 text-white mb-2" />
                  <h3 className="text-2xl font-bold text-white">{t("servicesSection.securityCard.title")}</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6 text-lg">
                  {t("servicesSection.securityCard.desc")}
                </p>
                <ul className="space-y-4">
                  {(t("servicesSection.securityCard.items", { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Facility Services with video montage */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover-lift overflow-hidden group">
              <div ref={hkRef} className="relative h-80 md:h-96 overflow-hidden">
                {showHkVideo ? (
                  <iframe
                    className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] pointer-events-none"
                    src={`https://www.youtube-nocookie.com/embed/00f-IbdsoX0?autoplay=1&mute=1&controls=0&loop=1&playlist=00f-IbdsoX0,L5dPqH9WO5o&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&origin=${location.origin}`}
                    title="Housekeeping Video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                ) : (
                  <>
                    <img
                      src="https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg"
                      alt="Professional Cleaning Team"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <button
                      type="button"
                      onClick={() => setShowHkVideo(true)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 text-white backdrop-blur-[1px]"
                      aria-label="Play housekeeping video"
                    >
                      <span className="inline-block rounded-full bg-white/90 text-black px-4 py-2 font-semibold">Play</span>
                    </button>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <Building className="w-10 h-10 text-white mb-2" />
                  <h3 className="text-2xl font-bold text-white">{t("servicesSection.facilityCard.title")}</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6 text-lg">
                  {t("servicesSection.facilityCard.desc")}
                </p>
                <ul className="space-y-4">
                  {(t("servicesSection.facilityCard.items", { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-brand-secondary flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Training Programs */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                <Trans i18nKey="training.heading">Professional <span className="gradient-text">Training Programs</span></Trans>
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {t("training.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(t("training.programs", { returnObjects: true }) as string[]).map((program, index) => (
                <div key={index} className="bg-white p-6 rounded-xl text-center shadow-md hover-lift group border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 break-words whitespace-normal leading-snug">{program}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section with HD Images */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-secondary to-brand-accent text-white mb-6 text-lg px-6 py-2">
              {t("gallery.badge")}
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              <Trans i18nKey="gallery.heading">Services in <span className="gradient-text">Action</span></Trans>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("gallery.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(
              [
                { image: "https://images.pexels.com/photos/8591606/pexels-photo-8591606.jpeg", gradient: "from-brand-primary to-brand-secondary" },
                { image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg", gradient: "from-brand-secondary to-brand-accent" },
                { image: "https://images.pexels.com/photos/8961259/pexels-photo-8961259.jpeg", gradient: "from-brand-accent to-brand-primary" },
                { image: "https://images.pexels.com/photos/19317897/pexels-photo-19317897.jpeg", gradient: "from-brand-primary to-brand-accent" },
                { image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg", gradient: "from-brand-secondary to-brand-primary" },
                { image: "https://images.pexels.com/photos/10303884/pexels-photo-10303884.jpeg", gradient: "from-brand-accent to-brand-secondary" }
              ].map((base, index) => ({
                ...base,
                title: (t("gallery.items", { returnObjects: true }) as any[])[index].title,
                category: (t("gallery.items", { returnObjects: true }) as any[])[index].category,
              }))
            ).map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className={`bg-gradient-to-r ${item.gradient} text-white mb-3 border-0`}>
                    {item.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="w-0 h-1 bg-gradient-to-r from-brand-accent to-brand-secondary group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-brand-navy via-brand-primary to-brand-navy text-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-secondary to-brand-accent text-white mb-6 text-lg px-6 py-2 border-0">
              {t("testimonials.badge")}
            </Badge>
            <h2 className="text-5xl font-bold mb-8"><Trans i18nKey="testimonials.heading">What Our <span className="text-brand-accent">Clients</span> Say</Trans></h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {t("testimonials.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t("testimonials.items", { returnObjects: true }) as any[]).map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg hover-lift group">
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-brand-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-200 mb-8 italic text-lg leading-relaxed">"{testimonial.feedback}"</p>
                  <div className="flex items-center space-x-4 border-t border-white/20 pt-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-secondary to-brand-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-brand-accent">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white mb-6 text-lg px-6 py-2">
              {t("contact.badge")}
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              <Trans i18nKey="contact.heading">Ready to <span className="gradient-text">Secure</span> Your Business?</Trans>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-t-lg">
                <CardTitle className="text-3xl flex items-center">
                  <Mail className="mr-3 w-8 h-8" />
                  {t("contact.form.submit")}
                </CardTitle>
                <CardDescription className="text-gray-100 text-lg">
                  {t("contact.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">{t("contact.form.fullName")}</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("contact.form.fullNamePlaceholder")}
                        className="h-12 border-2 border-gray-200 focus:border-brand-primary transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">{t("contact.form.email")}</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("contact.form.emailPlaceholder")}
                        className="h-12 border-2 border-gray-200 focus:border-brand-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">{t("contact.form.phone")}</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.phonePlaceholder")}
                      className="h-12 border-2 border-gray-200 focus:border-brand-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">{t("contact.form.message")}</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={5}
                      className="border-2 border-gray-200 focus:border-brand-primary transition-colors resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary-dark hover:to-brand-secondary text-white text-lg font-semibold shadow-xl hover-lift">
                  <Shield className="mr-3 w-6 h-6" />
                  {t("contact.form.submit")}
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                </form>
              </CardContent>
            </Card>

            {/* Enhanced Contact Information */}
            <div className="space-y-10">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900">{t("contact.info.getInTouch")}</h3>
                
                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: t("contact.info.officeAddress"),
                      content: "Sr.No. 358, Wipro Circle, Phase 2,\nHinjewadi, Man, Mulshi,\nPune, 411057",
                      gradient: "from-brand-primary to-brand-secondary"
                    },
                    {
                      icon: Phone,
                      title: t("contact.info.phoneNumbers"),
                      content: "Proprietor: +91 9890273333\nOperations: +91 9604279278",
                      gradient: "from-brand-secondary to-brand-accent"
                    },
                    {
                      icon: Mail,
                      title: t("contact.info.emailAddress"),
                      content: "succesfacility9922@gmail.com",
                      gradient: "from-brand-accent to-brand-primary"
                    },
                    {
                      icon: Clock,
                      title: t("contact.info.operatingHours"),
                      content: t("contact.info.operatingDetails"),
                      gradient: "from-brand-primary to-brand-accent"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-6 group">
                      <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-xl">{item.title}</h4>
                        {item.title === t("contact.info.phoneNumbers") ? (
                          <div className="text-gray-600 text-lg leading-relaxed space-y-1">
                            <div>
                              {t("contact.info.proprietor")} <a href="tel:+919890273333" className="text-brand-primary hover:underline">+91 9890273333</a>
                            </div>
                            <div>
                              {t("contact.info.operationHead")} <a href="tel:+919604279278" className="text-brand-primary hover:underline">+91 9604279278</a>
                            </div>
                          </div>
                        ) : item.title === t("contact.info.emailAddress") ? (
                          <p className="text-gray-600 text-lg leading-relaxed">
                            <a href="mailto:succesfacility9922@gmail.com" className="text-brand-primary hover:underline">succesfacility9922@gmail.com</a>
                          </p>
                        ) : (
                          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Team Information */}
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-8 text-white shadow-xl">
                <h4 className="font-bold text-2xl mb-6 flex items-center">
                  <Users className="mr-3 w-8 h-8" />
                  {t("contact.info.getInTouch")}
                </h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <span className="text-gray-200 font-medium">{t("contact.info.proprietor")}</span>
                    <span className="font-bold text-xl">{t("contact.info.proprietorName")}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <span className="text-gray-200 font-medium">{t("contact.info.operationHead")}</span>
                    <span className="font-bold text-xl">{t("contact.info.operationHeadName")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Blog Section */}
      <section id="blog" className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-secondary to-brand-accent text-white mb-6 text-lg px-6 py-2">
              {t("blog.badge")}
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              <Trans i18nKey="blog.heading">Security <span className="gradient-text">News & Updates</span></Trans>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("blog.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(t("blog.posts", { returnObjects: true }) as any[]).map((post, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift cursor-pointer group overflow-hidden">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className={`bg-gradient-to-r ${post.gradient} text-white border-0 shadow-lg`}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">{post.excerpt}</p>
                  {expandedPosts[index] && (
                    <p className="text-gray-600 text-base leading-relaxed mt-4">
                      {(t("blog.more", { returnObjects: true }) as string[])[index]}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-gray-500 font-medium">{post.date}</span>
                    <button
                      type="button"
                      onClick={() => setExpandedPosts((prev) => ({ ...prev, [index]: !prev[index] }))}
                      className="text-brand-primary font-semibold"
                    >
                      {expandedPosts[index] ? (
                        <span className="inline-flex items-center">{t("blog.readLess")} <ArrowRight className="ml-2 w-4 h-4 rotate-180" /></span>
                      ) : (
                        <span className="inline-flex items-center">{t("blog.readMore")} <ArrowRight className="ml-2 w-4 h-4" /></span>
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white mb-6 text-lg px-6 py-2">
              {t("faq.badge")}
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              <Trans i18nKey="faq.heading">Got <span className="gradient-text">Questions?</span> We Have Answers</Trans>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("faq.description")}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="space-y-6">
              {(t("faq.items", { returnObjects: true }) as any[]).map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`} className="bg-white rounded-2xl px-8 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <AccordionTrigger className="text-left font-bold text-gray-900 text-lg py-6 hover:text-brand-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
