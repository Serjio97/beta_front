
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, Users, BookOpen, Home as HomeIcon, Bot, Search, Target, DollarSign, Globe, Zap } from 'lucide-react';
import { CMSService, Service, CaseStudy, Product, Consulting } from '@/data/cmsData';
import TeamMembers from '@/components/TeamMembers';
import RunningText from '@/components/RunningText';
import Collaborators from '@/components/Collaborators';

import WelcomePopup from '@/components/WelcomePopup';

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [consulting, setConsulting] = useState<Consulting[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);


  const [styleSettings, setStyleSettings] = useState({
    heroType: 'video',
    heroImage: '',
    heroVideoUrl:'https://www.youtube.com/embed/UtmSyNOdUYQ?si=EB0xgcBK1vQWyBi2',
    runningTextCompanies: [
      'Sustainable-Investment', 'Startup-Support', 'Innovation-Consulting', 'Emerging-Markets', 'Emerging-Tech', 'Ventuer-Studio', 'Ecosystem-Building', 
      'Worldwide-Connections'
    ],
    collaborators: [
  {
    id: '1',
    name: 'Tunisian Startups',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWdZXtT-buPHs52zpna3LpGtG4VSj1gmRzQ&s',
    website: 'https://startup.gov.tn/fr/home'
  },
  {
    id: '2',
    name: 'InvestForJobs',
    logo: 'https://eina4jobs.org/sites/default/files/styles/large/public/2022-04/313d09e5-6952-4a8a-9e8f-a289e2851be1_1.png?itok=KYfs2tOF',
    website: 'https://invest-for-jobs.com/en/'
  },
  {
    id: '3',
    name: 'GIZ',
    logo: 'https://www.cocoainitiative.org/sites/default/files/logos/gizlogo-unternehmen-de-rgb-300-min.jpg',
    website: 'https://www.giz.de/en/worldwide/22600.html'
  },
  {
    id: '4',
    name: 'INNOVI',
    logo: 'https://innovi.tn/wp-content/uploads/2019/11/Logo300x150-300x150.png',
    website: 'https://innovi.tn/'
  },
  {
    id: '5',
    name: 'USAID',
    logo: 'https://tn.usembassy.gov/wp-content/uploads/sites/59/2017/05/USAID-Logo-1.jpg',
    website: 'https://tn.usembassy.gov/fr/embassy-fr/ambassade-des-etats-unis-tunis/usaid-en-tunisie/'
  },
  {
    id: '6',
    name: 'TBS',
    logo: 'https://tunis-business-school.tn/media/logo_hu3d8e5f27ad81de36e24c8e7a513aea7c_89571_300x300_fit_lanczos_3.png',
    website: 'https://tunis-business-school.tn/'
  },
  {
    id: '7',
    name: 'Beta-i',
    logo: 'https://beta-i.com/wp-content/uploads/2024/10/Logo-Positivo-Color_1-8.png',
    website: 'https://beta-i.com/'
  },
  {
    id: '8',
    name: 'TNW',
    logo: 'https://images.app.goo.gl/q4wLsZC6j2R1ZDbE7',
    website: 'https://thenextwomentunisie.com/'
  },
  {
    id: '9',
    name: 'Finastra',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/2/2f/Finastra.png',
    website: 'https://www.finastra.com/'
  },
  {
    id: '10',
    name: '216Capital',
    logo: 'https://216capital.vc/assets/images/logo-216Capital-black.png',
    website: 'https://216capital.vc/'
  },
  {
    id: '11',
    name: 'GPP',
    logo: 'https://www.global-project-partners.de/media/site/88b0f29413-1612944747/gpp-logo-1200x630-crop-1.png',
    website: 'https://www.global-project-partners.de/'
  },
  {
    id: '12',
    name: 'Gnt',
    logo: 'https://landportal.org/sites/default/files/2023-05/lrQMWH3.png',
    website: 'https://www.government.nl/'
  },
  {
    id: '13',
    name: 'ExpertiseFrance',
    logo: 'https://www.cdc.tn/sites/default/files/2024-07/ef-logo22%20%281%29.png',
    website: 'https://www.expertisefrance.fr/fr/accueil'
  },
  {
    id: '14',
    name: 'StartupAct',
    logo: 'https://www.expert-comptable-tunisie.net/wp-content/uploads/2020/03/startup-act-Tunisie.png',
    website: 'https://startup.gov.tn/fr/home'
  },
  {
    id: '15',
    name: 'UNECA',
    logo: 'https://msme-resurgence.unctad.org/sites/smesurge/files/2021-07/uneca%20main%20logo.png',
    website: 'https://www.uneca.org/fr'
  },
  {
    id: '16',
    name: 'STB',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_STB.png',
    website: 'https://www.stb.com.tn/fr/'
  },
  {
    id: '17',
    name: 'BH',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/4/44/BH-Bank.png',
    website: 'https://www.bhbank.tn/'
  },
  {
    id: '18',
    name: 'Attijari',
    logo: 'https://www.attijaribank.com.tn/sites/default/files/inline-images/logoAttijari.png',
    website: 'https://www.attijaribank.com.tn/fr'
  },
  {
    id: '19',
    name: 'Segal',
    logo: 'https://www.segalfamilyfoundation.org/wp-content/uploads/SFF-Mobile-Logo.svg',
    website: 'https://www.segalfamilyfoundation.org/'
  },
  {
    id: '20',
    name: 'Beta',
    logo: 'https://aspban.eu/portnetworks/wp-content/uploads/2021/11/Beta-i.png',
    website: 'https://beta-i.com/'
  },
  {
    id: '21',
    name: 'Gitex',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5MTbHcGnfFOqRrlHTA0e7fktBnhboTBroA&s',
    website: 'https://www.gitexnigeria.ng/'
  }
]
  });

  useEffect(() => {
    // Load style settings from localStorage
    const savedSettings = localStorage.getItem('styleSettings');
    if (savedSettings) {
      setStyleSettings(JSON.parse(savedSettings));
    }

    const fetchData = async () => {
      try {
        const [servicesData, caseStudiesData, productsData,popupData,consultingData] = await Promise.all([
          CMSService.getServices(),
          CMSService.getCaseStudies(),
          CMSService.getProducts(),
          CMSService.getPopup(),
          CMSService.getConsulting(),
        ]);
        setServices(servicesData.slice(0, 3)); // Featured services
        setConsulting(consultingData.slice(0, 3));
        setCaseStudies(caseStudiesData.slice(0, 2)); // Featured case studies
        setProducts(productsData.slice(0, 3));

         if (popupData?.isActive) {
        setShowPopup(true); // ✅ show popup if active
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      'home': HomeIcon,
      'arrow-up': ArrowUp,
      'book': BookOpen,
      'users': Users
    };
    return icons[iconName as keyof typeof icons] || HomeIcon;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
    <WelcomePopup /> 
   
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 md:text-4xl">
                Driving Innovation, Investment, and Ecosystem Growth
                <span className="gradient-text block">In Emerging Markets</span>

              </h1>
              <p className="text-xl  text-gray-600 mb-8 leading-relaxed">
               We provide innovation services, early-stage investment, and ecosystem support across the region. 
               From building startup programs and advising corporates and governments to co-creating ventures, 
               we help ideas grow and markets connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Start Your Journey</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://www.hubspot.fr/" target="_blank" rel="noopener noreferrer">
    Download Our Brochure
  </a>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">250+</div>
                  <div className="text-sm text-gray-600">Startups Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-gray-600">Innovation Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-600">Startups Built</div>
                </div>
              </div>
            </div>
            
         <div className="rounded-md shadow-xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl" >
  {styleSettings.heroType === 'video' ? (
    <div className="aspect-video w-full">
      <iframe
        src={styleSettings.heroVideoUrl.replace('watch?v=', 'embed/')}
        title="Hero Video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) 
  :(
    <img
      src={styleSettings.heroImage}
      alt="Hero"
      className="w-full h-72 object-cover"
    />
  )
  }

  <div className="p-6 bg-white">
    <h3 className="font-semibold text-gray-900 text-lg">Innovation in Action</h3>
    <p className="text-sm text-gray-600 mt-2">Where ideas meet execution</p>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Running Text Section */}
      <RunningText companies={styleSettings.runningTextCompanies} />

    

      {/* Mission Highlights */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              At Betawaves, we empower nations and industries to thrive by activating three core forces:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">People</h3>
              <p className="text-gray-600">
                We cultivate talent and strengthen human capital through tailored training, mentorship, and workforce development—building the next generation of tech leaders, innovators, and change-makers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Technology</h3>
              <p className="text-gray-600">
              We harness the power of emerging technologies to help startups and enterprises build scalable, efficient, and future-proof solutions across key sectors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We design and drive innovation ecosystems, launch ventures, and enable strategic transformation—working with governments, corporates, and startups to turn bold ideas into real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      {/* <section className="py-20">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Support You
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs designed to address every aspect of startup development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(service => {
            const IconComponent = getIcon(service.icon);
            return <Card key={service.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, index) => <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                          {feature}
                        </li>)}
                    </ul>
                    <div className="space-y-2 text-sm">
                      <div><strong>Duration:</strong> {service.duration}</div>
                      <div><strong>For:</strong> {service.eligibility}</div>
                    </div>
                  </CardContent>
                </Card>;
          })}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/programs">View All Programs</Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Featured Consulting */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Innovation Consulting
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive Consultings designed to address every aspect of startup development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consulting.map(consulting => {
            const IconComponent = getIcon(consulting.icon);
            return <Card key={consulting.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{consulting.title}</CardTitle>
                    <CardDescription className="text-base">{consulting.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {consulting.features.slice(0, 3).map((feature, index) => <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                          {feature}
                        </li>)}
                    </ul>
                    {/* <div className="space-y-2 text-sm">
                      <div><strong>Duration : </strong> {consulting.eligibility}</div>
                    </div> */}
                  </CardContent>
                </Card>;
          })}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/consultings">View All Consultings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-300">
              Innovative tools and platforms designed to empower your startup journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {products.map(product => (
  <Card key={product.id} className="h-full hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 text-white">
    <CardHeader>
      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
        <Bot className="h-6 w-6 text-primary" /> {/* You can dynamically map icon if needed */}
      </div>
      <CardTitle className="text-xl text-white">{product.name}</CardTitle>
      <CardDescription className="text-base text-gray-300">{product.description}</CardDescription>
    </CardHeader>
    <CardContent>
      {/* <div className="mb-6 text-sm text-gray-400">
        <strong>Price:</strong> {product.price}
      </div> */}
      <ul className="space-y-2 text-sm text-gray-300">
        {product.features.slice(0, 3).map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
))}

          </div>

          <div className="text-center mt-12">
            <Button asChild variant="secondary">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Fund Highlight Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-primary to-cyan-500 text-white relative overflow-hidden">
        {/* Enhanced backdrop pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-40 translate-y-40"></div>
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
          </svg>
        </div>
        
        <div className="container-width section-padding relative z-10">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <CardHeader className="text-center pb-8">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
                    <Zap className="h-4 w-4 mr-2" />
                    Impact Investment Fund
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Powering the Future of Sustainability and Climate Tech
                  <span className="block bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
                    Across MENA+ 

                  </span>
                </CardTitle>
                <CardDescription className="text-2xl text-white/95 mb-6 font-medium">
               
                </CardDescription>
                <p className="text-lg text-white/85 max-w-4xl mx-auto leading-relaxed">
                BetaVentures, the investment arm of Betawaves, 
                invests in early-stage startups using technology to tackle climate and environmental challenges.
                We support bold founders building real-world solutions that drive sustainability,
                resilience, and green growth across the MENA+ region.
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center group">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">$40M Fund Size</h3>
                    <p className="text-white/80 text-sm leading-relaxed">Targeting sustainability and climate tech startups from ideation to series A
</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">Regional Focus</h3>
                    <p className="text-white/80 text-sm leading-relaxed">Actively sourcing from Saudi Arabia, UAE, Jordan, Egypt, Tunisia, Morocco, Algeria, and Pakistan
</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">Beyond Capital</h3>
                    <p className="text-white/80 text-sm leading-relaxed">Venture building, expert guidance, and global network access</p>
                  </div>
                </div>

               

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <div className="text-center">
                    <p className="text-white/90 text-sm mb-3 font-medium">For Startups</p>
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all" asChild>
                      <a href="https://betaventuresfund1.decilehub.com/submit_your_company" target="_blank" rel="noopener noreferrer">Apply Now</a>
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-white/90 text-sm mb-3 font-medium">For Investors</p>
                    <Button size="lg" variant="outline" className="border-2 border-white text-primary hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-xl transition-all" asChild>
                <a href="https://betaventuresfund1.decilehub.com/pacts?pid=9nGqvjKm&dgrid=08c2c772-f426-4763-a30a-6ad9d7279dd3" target="_blank" rel="noopener noreferrer">Invest With Us</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            

            <div className="text-center mt-12">
              <Button asChild variant="secondary" size="lg" className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white hover:text-primary font-semibold rounded-xl">
                <a href="https://betaventuresfund1.decilehub.com/" target="_blank" rel="noopener noreferrer">Learn More About Betaventures</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 ">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Portfolio
            </h2>
            <p className="text-xl text-gray-600">
              See how we've helped startups achieve remarkable growth and success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map(caseStudy => <Card key={caseStudy.id} className="overflow-hidden">
                <div className="aspect-video">
                  <img src={caseStudy.image} alt={caseStudy.companyName} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{caseStudy.companyName}</CardTitle>
                    <span className="text-sm text-gray-500">{caseStudy.industry}</span>
                  </div>
                  <CardDescription>{caseStudy.description}</CardDescription>
                </CardHeader>
                <CardContent>
      {caseStudy.testimonial?.quote?.trim() && (
        <>
          <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 mb-4">
            "{caseStudy.testimonial.quote}"
          </blockquote>
          <div className="text-sm">
            <strong>{caseStudy.testimonial.author}</strong>
            <div className="text-gray-500">{caseStudy.testimonial.position}</div>
          </div>
        </>
      )}
    </CardContent>
              </Card>)}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/case-studies">View All Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <TeamMembers  />


  {/* Collaborators Section */}
      <Collaborators collaborators={styleSettings.collaborators} />


      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Startup?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of successful startups who have accelerated their growth with Betawaves. 
            Your journey to success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Download Brochure</Link>
            </Button>
          
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
