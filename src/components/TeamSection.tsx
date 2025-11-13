import { Link } from "react-router-dom";

import teamMemberOne from "@/assets/team/team-1.jpg";
import teamMemberTwo from "@/assets/team/team-2.jpg";
import teamMemberThree from "@/assets/team/team-3.jpg";

interface TeamSectionProps {
  id?: string;
  enableLinks?: boolean;
}

const teamMembers = [
  {
    name: "James Khomo",
    position: "Chief Executive Officer",
    title: "Visionary Leadership",
    image: teamMemberOne,
  },
  {
    name: "Joel Shilongo",
    position: "Chief Operations Officer",
    title: "Operational Excellence",
    image: teamMemberTwo,
  },
  {
    name: "Felix Amutenya",
    position: "Head of Development",
    title: "Strategic Development",
    image: teamMemberThree,
  },
];

const TeamSection = ({ id, enableLinks = true }: TeamSectionProps) => {
  return (
    <section id={id} className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The people driving Newgate&apos;s commitment to excellence across Namibia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const cardContent = (
              <article
                className="h-full rounded-3xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/65 backdrop-blur-sm px-6 py-5 text-white shadow-lg">
                    <span className="uppercase tracking-[0.25em] text-[0.65rem] text-white/80">
                      {member.title}
                    </span>
                    <h3 className="text-2xl font-semibold mt-3">{member.name}</h3>
                    <p className="text-sm text-white/85 mt-2">{member.position}</p>
                  </div>
                </div>
              </article>
            );

            if (enableLinks) {
              return (
                <Link
                  key={member.name}
                  to="/about#team"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={member.name} className="block">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

