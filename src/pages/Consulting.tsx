import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, BookOpen, Home as HomeIcon, ArrowUp, ArrowLeft } from 'lucide-react';
import { CMSService, Consulting } from '@/data/cmsData';

const ConsultingPage = () => {
  const [consultings, setConsultings] = useState<Consulting[]>([]);
  const [filteredConsultings, setFilteredConsultings] = useState<Consulting[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultings = async () => {
      try {
        const consultingsData = await CMSService.getConsulting();
        setConsultings(consultingsData);
        setFilteredConsultings(consultingsData);
      } catch (error) {
        console.error('Error fetching consultings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultings();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredConsultings(consultings);
    } else {
      setFilteredConsultings(consultings.filter(c => c.category === selectedCategory));
    }
  }, [selectedCategory, consultings]);

  const getIcon = (iconName: string) => {
    const icons = {
      'home': HomeIcon,
      'arrow-up': ArrowUp,
      'book': BookOpen,
      'users': Users
    };
    return icons[iconName as keyof typeof icons] || HomeIcon;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'program', label: 'Program' },
    { value: 'funding', label: 'Funding' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container-width section-padding text-center">
           <Button variant="outline" size="sm" className="mb-6" asChild>
                        <Link to="/" className="flex items-center space-x-2">
                          <ArrowLeft size={16} />
                          <span>Back to Home</span>
                        </Link>
                      </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Consulting Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tailored innovation consulting for startups, corporations, governments, and ecosystem enablers tackling strategic, product, marketing, or funding challenges.          
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-width section-padding">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Filter by category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredConsultings.map((consulting) => {
              const IconComponent = getIcon(consulting.icon);
              return (
                <Card key={consulting.id} className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {consulting.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{consulting.title}</CardTitle>
                    <CardDescription className="text-base">{consulting.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow justify-between">
  <div>
   <ul className="space-y-2 mb-6">
      {consulting.features.map((feature, index) => (
        <li key={index} className="flex items-start text-sm text-gray-600">
          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
          <span className="leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="text-sm text-gray-700 mb-4">
      <strong>Duration:</strong> {consulting.eligibility}
    </div>
  </div>

  {/* {consulting.directUrl && (
    <Button className="w-full mt-auto" onClick={() => window.open(consulting.directUrl, '_blank')}>
      Learn More
    </Button>
  )} */}
  <Link to="/contact" className="w-full mt-auto">
  <Button className="w-full">Contact Us</Button>
</Link>
</CardContent>
                  
                </Card>
                
              );
            })}
          </div>

          {filteredConsultings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No consulting services found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Strategic Support?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book a consulting session with our experts and take the next step in your startup's innovation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto focus:ring-2 focus:ring-white">
              <a href="https://hubs.ly/Q03yCr_T0" target="_blank" rel="noopener noreferrer">
                    Download Our Brochure
                  </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultingPage;
