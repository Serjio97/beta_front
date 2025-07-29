
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CMSService, CaseStudy } from '@/data/cmsData';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Home as HomeIcon, ArrowUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await CMSService.getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const categories = ['all', ...Array.from(new Set(caseStudies.map(cs => cs.industry)))];
  
  const filteredCaseStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-50 py-20">
        <div className="container-width section-padding">
          <div className="text-center max-w-3xl mx-auto">
             <Button variant="outline" size="sm" className="mb-6" asChild>
                                    <Link to="/" className="flex items-center space-x-2">
                                      <ArrowLeft size={16} />
                                      <span>Back to Home</span>
                                    </Link>
                                  </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Our</span> Stories
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover how we've helped startups overcome challenges, secure funding, and achieve remarkable growth. 
              These are the stories of innovation, perseverance, and success.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container-width section-padding">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Industries' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-8 md:py-20 bg-gray-50">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 gap-4 md:gap-12">
            {filteredCaseStudies.map((caseStudy, index) => (
              <Card key={caseStudy.id} className={`overflow-hidden  hover:shadow-xl transition-all duration-300 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:flex">
                  {/* Image */}
                  <div className="lg:w-1/2">
                    <div className="aspect-video lg:aspect-square">
                      <img 
                        src={caseStudy.image} 
                        alt={caseStudy.companyName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="lg:w-1/2 p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-2xl">{caseStudy.companyName}</CardTitle>
                        <Badge variant="secondary">{caseStudy.industry}</Badge>
                      </div>
                      <CardDescription className="text-base">
                        {caseStudy.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0 space-y-6">
                      {/* Challenge & Solution */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">The Challenge</h4>
                          <p className="text-gray-600 text-sm">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Our Solution</h4>
                          <p className="text-gray-600 text-sm">{caseStudy.solution}</p>
                        </div>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Results</h4>
                        <ul className="space-y-2">
                          {caseStudy.results.map((result, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                     {/* Testimonial */}
{caseStudy.testimonial?.quote?.trim() && (
  <div className="bg-primary/5 p-6 rounded-lg">
    <blockquote className="text-gray-700 italic mb-4">
      "{caseStudy.testimonial.quote}"
    </blockquote>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
        <span className="text-primary font-semibold text-lg">
          {caseStudy.testimonial.author?.charAt(0) || ''}
        </span>
      </div>
      <div>
        <div className="font-semibold text-gray-900">
          {caseStudy.testimonial.author}
        </div>
        <div className="text-sm text-gray-600">
          {caseStudy.testimonial.position}
        </div>
      </div>
    </div>
  </div>
)}


                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that showcase our commitment to startup success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { value: '250+', label: 'Startups Supported' },
              { value: '10+', label: 'Innovation Programs' },
              { value: '12', label: 'Startups from scratch' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
