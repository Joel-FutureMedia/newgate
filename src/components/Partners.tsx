import logo1 from "@/assets/Partners/HVGQS_symbol png (Feb 2021)_edited.jpg";
import logo2 from "@/assets/Partners/kmd-1.png";
import logo3 from "@/assets/Partners/Logo1@2x.png";
import logo4 from "@/assets/Partners/wce.png";

const partners = [
  { id: 1, logo: logo1, name: "HVGQS" },
  { id: 2, logo: logo2, name: "KMD" },
  { id: 3, logo: logo3, name: "Partner 3" },
  { id: 4, logo: logo4, name: "WCE" },
];

const Partners = () => {
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading companies and organizations across Namibia
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex items-center gap-10 min-w-max animate-marquee">
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 w-48 h-32 rounded-3xl bg-white shadow-soft border border-border/50 p-6 flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;

