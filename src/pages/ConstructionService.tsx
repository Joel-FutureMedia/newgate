import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, HardHat, Clock, CheckCircle, Users } from "lucide-react";

// Import all images
import img1 from "@/assets/Construction Management/danist-soh-8Gg2Ne_uTcM-unsplash.jpg";
import img2 from "@/assets/Construction Management/joe-holland-80zZ1s24Nag-unsplash.jpg";
import img3 from "@/assets/Construction Management/mark-potterton-sNVkn3507Oo-unsplash.jpg";
import img4 from "@/assets/Construction Management/mathieu-stern-tv7GF92ZWvs-unsplash.jpg";
import img5 from "@/assets/Construction Management/nguy-n-hi-p-mvYyxn02rjk-unsplash.jpg";
import img6 from "@/assets/Construction Management/scott-blake-x-ghf9LjrVg-unsplash.jpg";
import img7 from "@/assets/Construction Management/tolu-olubode-PlBsJ5MybGc-unsplash.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

const features = [
  {
    icon: HardHat,
    title: "Expert Team",
    description: "Experienced construction professionals with deep knowledge of Namibian building codes and standards.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Commitment to completing projects on schedule without compromising quality or safety standards.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous quality control processes ensuring every project meets international construction standards.",
  },
  {
    icon: Users,
    title: "Project Management",
    description: "Comprehensive project management from planning to completion, ensuring seamless execution.",
  },
];

const ConstructionService = () => {
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
                <h1 className="text-5xl md:text-6xl font-bold">Construction Management</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Professional construction management services delivering exceptional builds across Namibia. 
                  From residential developments to commercial complexes, we bring your vision to life with 
                  precision, quality, and efficiency.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our experienced team manages every aspect of the construction process, ensuring projects 
                  are completed on time, within budget, and to the highest standards. We work closely with 
                  clients, architects, and contractors to deliver seamless construction experiences.
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
                  alt="Construction Management"
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
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Construction Services</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional construction management that delivers results you can trust
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
            <h2 className="text-4xl font-bold text-center mb-12">Our Construction Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Planning & Design</h3>
                <p className="text-muted-foreground">
                  Comprehensive planning and design phase ensuring all requirements are met before construction begins
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Execution</h3>
                <p className="text-muted-foreground">
                  Professional construction execution with regular progress updates and quality inspections
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Completion & Handover</h3>
                <p className="text-muted-foreground">
                  Final inspections, quality assurance, and seamless handover of completed projects
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Vision?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your construction project and how we can bring it to life
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

export default ConstructionService;

