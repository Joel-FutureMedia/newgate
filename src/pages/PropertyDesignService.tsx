import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, PenTool, Lightbulb, Palette, Home } from "lucide-react";

// Import all images
import img1 from "@/assets/Property Design & Development/aalo-lens-B9OMpxCdrlc-unsplash.jpg";
import img2 from "@/assets/Property Design & Development/aalo-lens-QHyUx3OcCns-unsplash.jpg";
import img3 from "@/assets/Property Design & Development/dariia-lemesheva-Sg-9ld5d0TM-unsplash.jpg";
import img4 from "@/assets/Property Design & Development/gunnar-ridderstrom-JkygvV9kYlw-unsplash.jpg";
import img5 from "@/assets/Property Design & Development/gunnar-ridderstrom-K3RHAZTvMSU-unsplash.jpg";
import img6 from "@/assets/Property Design & Development/josh-marty-HWdb0wb7jMo-unsplash.jpg";
import img7 from "@/assets/Property Design & Development/kai-muro-r8OGtjZeQ3c-unsplash.jpg";
import img8 from "@/assets/Property Design & Development/kenset-3qK7YDFEllQ-unsplash.jpg";
import img9 from "@/assets/Property Design & Development/soans-pj-1rxPiN3fIgk-unsplash.jpg";
import img10 from "@/assets/Property Design & Development/studio-archifiction-KM_PKLjmrx4-unsplash.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const features = [
  {
    icon: PenTool,
    title: "Architectural Design",
    description: "Innovative architectural designs that blend modern aesthetics with functional excellence for Namibian properties.",
  },
  {
    icon: Lightbulb,
    title: "Creative Solutions",
    description: "Creative and sustainable design solutions tailored to Namibia's unique climate and architectural heritage.",
  },
  {
    icon: Palette,
    title: "Interior Design",
    description: "Comprehensive interior design services creating beautiful, functional spaces that reflect your style and needs.",
  },
  {
    icon: Home,
    title: "Property Development",
    description: "End-to-end property development services from concept to completion, ensuring every detail is perfect.",
  },
];

const PropertyDesignService = () => {
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
                <h1 className="text-5xl md:text-6xl font-bold">Property Design & Development</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your property vision into reality with our comprehensive design and development services. 
                  We create exceptional spaces that combine innovative architecture with sustainable practices, 
                  perfectly suited for Namibia's unique landscape and climate.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From initial concept to final execution, our team of architects, designers, and developers 
                  work together to deliver properties that exceed expectations. We specialize in residential, 
                  commercial, and mixed-use developments across Namibia.
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
                  alt="Property Design & Development"
                  className="w-full h-full object-cover transition-opacity duration-1000"
                />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {images.slice(0, 5).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        index === currentImageIndex % 5 ? "bg-white" : "bg-white/50"
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
              <h2 className="text-4xl font-bold mb-4">Our Design Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive design and development solutions for every property need
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

        {/* Process Section */}
        <section className="px-6 py-24 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Concept & Planning</h3>
                <p className="text-muted-foreground">
                  Initial consultation and concept development to understand your vision and requirements
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Design Development</h3>
                <p className="text-muted-foreground">
                  Detailed design development with 3D visualizations and material selections
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Implementation</h3>
                <p className="text-muted-foreground">
                  Project implementation and development with regular updates and quality assurance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Design Your Property?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your property design and development needs
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

export default PropertyDesignService;

