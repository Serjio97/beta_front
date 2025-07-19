import { Card, CardContent } from '@/components/ui/card';
import { CMSService, TeamMember } from '@/data/cmsData';
import { useEffect, useState, useRef } from 'react';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showAll, setShowAll] = useState(false); // 👈 toggle state
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await CMSService.getTeamMembers();
        const formatted = data.map((member: any) => ({
          ...member,
          linkedIn: member.linkedin_url,
        }));
        setTeamMembers(formatted);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const el = scrollRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScrollLeft) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 👇 Limit to first 4 if not showing all
  const visibleMembers = showAll ? teamMembers : teamMembers.slice(0, 4);

  return (
    <section className="py-20">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced team of entrepreneurs, investors, and industry experts are dedicated to your startup's success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleMembers.map((member) => (
            <Card key={member.id} className="text-center flex flex-col justify-between hover:shadow-lg transition-shadow group">
              <CardContent className="p-6 flex flex-col flex-grow justify-between">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.position}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                {member.linkedin_url && (
                  <div className="mt-4">
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Connect on LinkedIn →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 👇 See More / See Less toggle */}
        {teamMembers.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              {showAll ? 'See Less ↑' : 'See More ↓'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamMembers;
