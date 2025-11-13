import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { TrendingUp, Shield, Users } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Market Expertise",
    description: "Deep understanding of Namibian real estate market trends and investment opportunities.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous quality control and compliance with international construction standards.",
  },
  {
    icon: Users,
    title: "Client Focus",
    description: "Personalized service and dedicated support throughout your investment journey.",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the full breadth of Newgate&apos;s real estate, construction, and development expertise.
            </p>
          </div>
        </div>

        <Services showFullDetails={true} showHeading={false} />

        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Newgate</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence sets us apart in the Namibian real estate market
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can help you achieve your real estate goals
            </p>
            <a 
              href="mailto:info@newgate.com.na"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
