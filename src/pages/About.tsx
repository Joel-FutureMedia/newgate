import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, Target, Eye, Award } from "lucide-react";
import TeamSection from "@/components/TeamSection";

// Import all images
import img1 from "@/assets/About us/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg";
import img2 from "@/assets/About us/jeriden-villegas-VLPUm5wP5Z0-unsplash.jpg";
import img3 from "@/assets/About us/josue-isai-ramos-figueroa-qvBYnMuNJ9A-unsplash.jpg";
import img4 from "@/assets/About us/nathan-waters-j7q-Z9DV3zw-unsplash.jpg";
import img5 from "@/assets/About us/ndumiso-silindza-ibu9zUnkLFw-unsplash.jpg";
import img6 from "@/assets/About us/pexels-thirdman-8469982.jpg";
import img7 from "@/assets/About us/pexels-tima-miroshnichenko-6615294.jpg";
import img8 from "@/assets/About us/saad-salim-PqRvLsjD_TU-unsplash.jpg";
import img9 from "@/assets/About us/shivendu-shukla-3yoTPuYR9ZY-unsplash.jpg";
import img10 from "@/assets/About us/tolu-olubode-PlBsJ5MybGc-unsplash.jpg";

const aboutItems = [
  {
    image: img1,
    title: "Our Mission",
    description: "To transform Namibia's real estate landscape through innovative development, strategic investment, and unwavering commitment to quality and sustainability. We aim to create lasting value for our clients and communities across Namibia.",
    icon: Target,
  },
  {
    image: img2,
    title: "Our Vision",
    description: "To be Namibia's most trusted and respected real estate investment company, recognized for creating exceptional value and landmark developments that shape the future of our nation's built environment.",
    icon: Eye,
  },
  {
    image: img3,
    title: "Our Values",
    description: "Excellence, integrity, innovation, and client satisfaction guide every decision we make and every project we undertake. We are committed to building trust through transparency and delivering on our promises.",
    icon: Award,
  },
  {
    image: img4,
    title: "Who We Are",
    description: "Newgate Investments is a premier real estate development and investment company based in Windhoek, Namibia. We specialize in creating exceptional properties that combine architectural excellence with strategic investment value.",
  },
  {
    image: img5,
    title: "Our Expertise",
    description: "With over 15 years of experience in the Namibian market, our team brings deep local knowledge combined with international best practices to deliver exceptional results for our clients.",
  },
  {
    image: img6,
    title: "Our Commitment",
    description: "We are dedicated to sustainable development practices that respect Namibia's unique environment while creating modern, functional spaces that meet the needs of today and tomorrow.",
  },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aboutItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % aboutItems.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + aboutItems.length) % aboutItems.length);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + aboutItems.length) % aboutItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % aboutItems.length);
  };

  const currentItem = aboutItems[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32">
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About Newgate Investments</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Building Namibia's future through strategic real estate investment, 
                exceptional construction, and innovative property development
              </p>
            </div>

            {/* Swipeable About Section */}
            <div
              className="relative bg-card rounded-3xl shadow-medium overflow-hidden mb-24"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-medium transition-all z-10"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-medium transition-all z-10"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {aboutItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex ? "bg-white w-8" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
              </div>
            </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6 animate-fade-in">
                    {currentItem.icon && (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <currentItem.icon className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    <h2 className="text-3xl md:text-4xl font-bold">{currentItem.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TeamSection id="team" enableLinks={false} />

        <section className="py-24 px-6 bg-gradient-hero">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Every project we undertake is a testament to our dedication to quality, 
              innovation, and client satisfaction. We don't just build properties – 
              we create lasting value and landmark destinations that shape Namibia's future.
            </p>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-5xl font-bold text-primary mb-2">15+</div>
                <div className="text-xl text-muted-foreground">Years Experience</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-xl text-muted-foreground">Projects Completed</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-5xl font-bold text-primary mb-2">200+</div>
                <div className="text-xl text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
