import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FundMap from '@/components/FundMap';
import { ArrowLeft, DollarSign, MapPin, Users, Leaf, Zap, Droplets, Truck, Factory, Recycle } from 'lucide-react';

const Fund = () => {
  const sectors = [
    { 
      name: 'Agritech and Food Security', 
      icon: Leaf,
      description: 'Supporting innovative solutions for sustainable agriculture, precision farming, and food security across Africa'
    },
    { 
      name: 'Waste Management', 
      icon: Recycle,
      description: 'Investing in circular economy solutions, waste-to-energy technologies, and sustainable waste processing systems'
    },
    { 
      name: 'E-Mobility', 
      icon: Zap,
      description: 'Accelerating electric vehicle adoption, charging infrastructure, and sustainable transportation solutions'
    },
    { 
      name: 'RE Optimization', 
      icon: Factory,
      description: 'Enhancing renewable energy efficiency through smart grid technologies and energy storage solutions'
    },
    { 
      name: 'Clean Industries', 
      icon: Users,
      description: 'Transforming industrial processes through clean technologies and sustainable manufacturing practices'
    },
    { 
      name: 'Sustainable Supply Chain', 
      icon: Truck,
      description: 'Building transparent, efficient, and environmentally responsible supply chain solutions'
    }
  ];

  const fundHighlights = [
    {
      title: '$40M Fund Size',
      description: 'Targeting sustainability and climate tech startups from ideation to series A',
      icon: DollarSign
    },
    {
      title: 'Regional Focus',
      description: 'Actively sourcing from Saudi Arabia, UAE, Jordan, Egypt, Tunisia, Morocco, Algeria, and Pakistan',
      icon: MapPin
    },
    {
      title: 'Beyond Capital',
      description: 'Venture building, expert guidance, and global network access',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="outline" size="sm" className="mb-6" asChild>
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powering the Future of Sustainability 
              <span className="block">and Climate Tech</span>
               
              <span className="block">Across  <span className="gradient-text">MENA+</span></span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
             BetaVentures, the investment arm of Betawaves, invests in early-stage startups using technology to tackle climate and environmental challenges.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We support bold founders building real-world solutions that drive sustainability, resilience, and green growth across the MENA+ region.
            </p>
          </div>
        </div>
      </section>

      {/* Fund Highlights */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fund Highlights
            </h2>
            <p className="text-xl text-gray-600">
              Strategic investment focused on maximum impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fundHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                    <CardDescription className="text-base">
                      {highlight.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Investment Focus */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Investment Focus
            </h2>
            <p className="text-xl text-gray-600">
              Six key sectors driving climate innovation across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => {
              const IconComponent = sector.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{sector.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-2">
                      {sector.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Geographic Focus Map */}
      <FundMap />

      {/* Impact and Sustainability */}
      <section className="py-20 bg-white">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Impact and Sustainability
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to responsible investing drives positive environmental and social outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <div className="w-16 h-16  bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center">ESG Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 space-y-4">
                  <p>
                   Investing with Purpose and Responsibility
At Betaventures, ESG (Environmental, Social, and Governance) principles are embedded into every investment decision we make.

                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Rigorous impact assessments for every portfolio company</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Tailored ESG action plans to improve performance over time</span>
                    </li>
                   
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Clear reporting on local and regional impact</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span> Active advocacy for responsible innovation and sustainable growth</span>
                    </li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-center">Gender Lens Investing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 space-y-4">
                  <p>
                   We are committed to building a more inclusive and equitable startup ecosystem.
Betaventures aims for at least 40% of its portfolio to be made up of startups founded or co-founded by women.

                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>To further support this mission, we are committing 1% of the fund’s carry to programs
                         that empower girls and women in tech across the MENA+ region.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Promoting workplace diversity and inclusion</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Creating products and services that benefit women</span>
                    </li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-primary to-cyan-500 text-white">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Climate Tech?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join us in building the future of climate technology across Africa
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-xl mb-2">For Startups</CardTitle>
                <CardDescription className="text-white/80">
                  Apply for funding and join our ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" variant="secondary" className="w-full" asChild>
                <a href="https://betaventuresfund1.decilehub.com/submit_your_company" target="_blank" rel="noopener noreferrer">Apply Now</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-xl mb-2">For Investors</CardTitle>
                <CardDescription className="text-white/80">
                  Partner with us to drive climate impact
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" variant="secondary" className="w-full" asChild>
                <a href="https://betaventuresfund1.decilehub.com/pacts?pid=9nGqvjKm&dgrid=08c2c772-f426-4763-a30a-6ad9d7279dd3" target="_blank" rel="noopener noreferrer">Invest With Us</a>
                </Button>
              </CardContent>
            </Card>
              <Button asChild variant="secondary" size="lg" className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white hover:text-primary font-semibold rounded-xl">
                <a href="https://betaventuresfund1.decilehub.com/" target="_blank" rel="noopener noreferrer">Learn More About Betaventures</a>
              </Button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Fund;