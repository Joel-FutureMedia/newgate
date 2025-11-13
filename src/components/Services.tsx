import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, MapPin, Building2, HardHat, Clock, CheckCircle, Users, PenTool, Lightbulb, Palette, Home } from "lucide-react";
import realEstateImg from "@/assets/Real Estate Investment/eslam-tawakol-TqouW9u0qmk-unsplash.jpg";
import constructionImg from "@/assets/Construction Management/danist-soh-8Gg2Ne_uTcM-unsplash.jpg";
import propertyDesignImg from "@/assets/Property Design & Development/aalo-lens-B9OMpxCdrlc-unsplash.jpg";

// Real Estate Investment images
import reImg1 from "@/assets/Real Estate Investment/eslam-tawakol-TqouW9u0qmk-unsplash.jpg";
import reImg2 from "@/assets/Real Estate Investment/grant-durr-1Inl7fbfwCI-unsplash.jpg";
import reImg3 from "@/assets/Real Estate Investment/samson-vowles-f5QahUP8PJ0-unsplash.jpg";
import reImg4 from "@/assets/Real Estate Investment/sorin-gheorghita-LfF4tXBSPN8-unsplash.jpg";
import reImg5 from "@/assets/Real Estate Investment/the-artboard-uWZJHwTUXyY-unsplash.jpg";
import reImg6 from "@/assets/Real Estate Investment/virgyl-sowah-E9NPWGBXM9o-unsplash.jpg";
import reImg7 from "@/assets/Real Estate Investment/webaliser-_TPTXZd9mOo-unsplash.jpg";

// Construction Management images
import cmImg1 from "@/assets/Construction Management/danist-soh-8Gg2Ne_uTcM-unsplash.jpg";
import cmImg2 from "@/assets/Construction Management/joe-holland-80zZ1s24Nag-unsplash.jpg";
import cmImg3 from "@/assets/Construction Management/mark-potterton-sNVkn3507Oo-unsplash.jpg";
import cmImg4 from "@/assets/Construction Management/mathieu-stern-tv7GF92ZWvs-unsplash.jpg";
import cmImg5 from "@/assets/Construction Management/nguy-n-hi-p-mvYyxn02rjk-unsplash.jpg";
import cmImg6 from "@/assets/Construction Management/scott-blake-x-ghf9LjrVg-unsplash.jpg";
import cmImg7 from "@/assets/Construction Management/tolu-olubode-PlBsJ5MybGc-unsplash.jpg";

// Property Design & Development images
import pdImg1 from "@/assets/Property Design & Development/aalo-lens-B9OMpxCdrlc-unsplash.jpg";
import pdImg2 from "@/assets/Property Design & Development/aalo-lens-QHyUx3OcCns-unsplash.jpg";
import pdImg3 from "@/assets/Property Design & Development/dariia-lemesheva-Sg-9ld5d0TM-unsplash.jpg";
import pdImg4 from "@/assets/Property Design & Development/gunnar-ridderstrom-JkygvV9kYlw-unsplash.jpg";
import pdImg5 from "@/assets/Property Design & Development/gunnar-ridderstrom-K3RHAZTvMSU-unsplash.jpg";
import pdImg6 from "@/assets/Property Design & Development/josh-marty-HWdb0wb7jMo-unsplash.jpg";
import pdImg7 from "@/assets/Property Design & Development/kai-muro-r8OGtjZeQ3c-unsplash.jpg";
import pdImg8 from "@/assets/Property Design & Development/kenset-3qK7YDFEllQ-unsplash.jpg";
import pdImg9 from "@/assets/Property Design & Development/soans-pj-1rxPiN3fIgk-unsplash.jpg";
import pdImg10 from "@/assets/Property Design & Development/studio-archifiction-KM_PKLjmrx4-unsplash.jpg";

interface ServicesProps {
  showFullDetails?: boolean;
  showHeading?: boolean;
}

const Services = ({ showFullDetails = false, showHeading = true }: ServicesProps) => {
  const [realEstateIndex, setRealEstateIndex] = useState(0);
  const [constructionIndex, setConstructionIndex] = useState(0);
  const [propertyDesignIndex, setPropertyDesignIndex] = useState(0);

  const realEstateImages = [reImg1, reImg2, reImg3, reImg4, reImg5, reImg6, reImg7];
  const constructionImages = [cmImg1, cmImg2, cmImg3, cmImg4, cmImg5, cmImg6, cmImg7];
  const propertyDesignImages = [pdImg1, pdImg2, pdImg3, pdImg4, pdImg5, pdImg6, pdImg7, pdImg8, pdImg9, pdImg10];

  useEffect(() => {
    if (!showFullDetails) return;

    const realEstateInterval = setInterval(() => {
      setRealEstateIndex((prev) => (prev + 1) % realEstateImages.length);
    }, 4000);

    const constructionInterval = setInterval(() => {
      setConstructionIndex((prev) => (prev + 1) % constructionImages.length);
    }, 4500);

    const propertyDesignInterval = setInterval(() => {
      setPropertyDesignIndex((prev) => (prev + 1) % propertyDesignImages.length);
    }, 5000);

    return () => {
      clearInterval(realEstateInterval);
      clearInterval(constructionInterval);
      clearInterval(propertyDesignInterval);
    };
  }, [showFullDetails, realEstateImages.length, constructionImages.length, propertyDesignImages.length]);

  const services = [
    {
      id: "real-estate",
      title: "Real Estate Investment",
      shortDescription: "Strategic investment opportunities in prime Namibian properties with exceptional returns and long-term growth potential.",
      fullDescription: "Unlock exceptional investment opportunities in Namibia's thriving real estate market. Our strategic approach combines market expertise with prime property selection to deliver outstanding returns for investors seeking long-term growth. With deep roots in the Namibian market, we specialize in identifying and acquiring high-value properties across Windhoek, Swakopmund, and emerging markets. Our team provides end-to-end investment services, from property sourcing to portfolio management.",
      image: realEstateImg,
      images: realEstateImages,
      currentImageIndex: realEstateIndex,
      setImageIndex: setRealEstateIndex,
      link: "/services/real-estate",
      features: [
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
      ],
    },
    {
      id: "construction",
      title: "Construction Management",
      shortDescription: "End-to-end construction services delivering quality builds on time and within budget, from residential to commercial projects.",
      fullDescription: "Professional construction management services delivering exceptional builds across Namibia. From residential developments to commercial complexes, we bring your vision to life with precision, quality, and efficiency. Our experienced team manages every aspect of the construction process, ensuring projects are completed on time, within budget, and to the highest standards. We work closely with clients, architects, and contractors to deliver seamless construction experiences.",
      image: constructionImg,
      images: constructionImages,
      currentImageIndex: constructionIndex,
      setImageIndex: setConstructionIndex,
      link: "/services/construction",
      features: [
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
      ],
    },
    {
      id: "property-design",
      title: "Property Design & Development",
      shortDescription: "Innovative architectural design and property development services that blend functionality with aesthetic excellence.",
      fullDescription: "Transform your property vision into reality with our comprehensive design and development services. We create exceptional spaces that combine innovative architecture with sustainable practices, perfectly suited for Namibia's unique landscape and climate. From initial concept to final execution, our team of architects, designers, and developers work together to deliver properties that exceed expectations. We specialize in residential, commercial, and mixed-use developments across Namibia.",
      image: propertyDesignImg,
      images: propertyDesignImages,
      currentImageIndex: propertyDesignIndex,
      setImageIndex: setPropertyDesignIndex,
      link: "/services/property-design",
      features: [
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
      ],
    },
  ];

  return (
    <section className={`${showFullDetails ? 'pt-0 pb-24' : 'py-24'} px-6 bg-gradient-subtle`}>
      <div className="max-w-7xl mx-auto">
        {showHeading && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your investment goals
            </p>
          </div>
        )}

        {showFullDetails ? (
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                  <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-medium group">
                    <div className="absolute inset-0">
                      {service.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`${service.title} ${imgIndex + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            imgIndex === service.currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                          }`}
                        />
                      ))}
                    </div>
                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {service.images.slice(0, 5).map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => service.setImageIndex(imgIndex)}
                          className={`h-2 rounded-full transition-all ${
                            imgIndex === service.currentImageIndex % 5
                              ? "bg-white w-8"
                              : "bg-white/50 w-2"
                          }`}
                          aria-label={`Go to image ${imgIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-5xl font-bold">{service.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.fullDescription}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${(index * 0.1) + (featureIndex * 0.05)}s` }}
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="border-none shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in overflow-hidden rounded-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {service.shortDescription}
                  </CardDescription>
                  <Link to={service.link}>
                    <Button className="w-full rounded-lg bg-primary text-white hover:bg-primary/90">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
