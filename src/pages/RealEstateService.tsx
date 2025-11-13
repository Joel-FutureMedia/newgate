import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Shield, MapPin, Building2 } from "lucide-react";

// Import all images
import img1 from "@/assets/Real Estate Investment/eslam-tawakol-TqouW9u0qmk-unsplash.jpg";
import img2 from "@/assets/Real Estate Investment/grant-durr-1Inl7fbfwCI-unsplash.jpg";
import img3 from "@/assets/Real Estate Investment/samson-vowles-f5QahUP8PJ0-unsplash.jpg";
import img4 from "@/assets/Real Estate Investment/sorin-gheorghita-LfF4tXBSPN8-unsplash.jpg";
import img5 from "@/assets/Real Estate Investment/the-artboard-uWZJHwTUXyY-unsplash.jpg";
import img6 from "@/assets/Real Estate Investment/virgyl-sowah-E9NPWGBXM9o-unsplash.jpg";
import img7 from "@/assets/Real Estate Investment/webaliser-_TPTXZd9mOo-unsplash.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const features = [
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Comprehensive market research and analysis of Namibian real estate trends to identify the best investment opportunities.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Strategic risk assessment and mitigation strategies to protect your investment portfolio.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Access to premium properties in Windhoek, Swakopmund, and other high-growth areas across Namibia.",
  },
  {
    icon: Building2,
    title: "Portfolio Diversification",
    description: "Diversify your investment portfolio with residential, commercial, and mixed-use properties.",
  },
];

const RealEstateService = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold">Real Estate Investment</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Unlock exceptional investment opportunities in Namibia's thriving real estate market. 
                  Our strategic approach combines market expertise with prime property selection to deliver 
                  outstanding returns for investors seeking long-term growth.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With deep roots in the Namibian market, we specialize in identifying and acquiring 
                  high-value properties across Windhoek, Swakopmund, and emerging markets. Our team 
                  provides end-to-end investment services, from property sourcing to portfolio management.
                </p>
                <div className="flex gap-4">
                  <Button asChild className="rounded-lg">
                    <Link to="/#contact">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg">
                    <Link to="/projects">View Projects</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-medium animate-fade-in">
                <img 
                  src={images[currentImageIndex]} 
                  alt="Real Estate Investment"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Invest with Us</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive approach ensures your real estate investments are strategically positioned for success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-3xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Process Section */}
        <section className="px-6 py-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Investment Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Market Research</h3>
                <p className="text-muted-foreground">
                  Comprehensive analysis of Namibian real estate markets to identify high-potential opportunities
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Property Selection</h3>
                <p className="text-muted-foreground">
                  Careful vetting and selection of properties that align with your investment goals and risk profile
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Portfolio Management</h3>
                <p className="text-muted-foreground">
                  Ongoing management and optimization of your investment portfolio for maximum returns
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Investing?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how we can help you build a profitable real estate investment portfolio in Namibia
            </p>
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
              <Link to="/#contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RealEstateService;

