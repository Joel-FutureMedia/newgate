import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import AboutUsSection from "@/components/AboutUsSection";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <Services />

      <AboutUsSection />

      <TeamSection />

      <Partners />

      <section className="py-24 px-6 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Invest in Namibia's Future?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Partner with Newgate Investments for exceptional real estate opportunities
          </p>
          <a 
            href="mailto:info@newgate.com.na"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-white text-primary hover:bg-white/90 transition-colors font-medium text-lg"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
