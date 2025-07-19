import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUp, Users, BookOpen, Home as HomeIcon } from 'lucide-react';
import { CMSService, Service } from '@/data/cmsData';
import ServiceApplicationForm from '@/components/ServiceApplicationForm';

const Programs = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await CMSService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-50 py-20">
        <div className="container-width section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Programs</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive support programs designed to accelerate your startup's growth at every stage. 
              From ideation to scaling, we provide the resources, mentorship, and networks you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 gap-12">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <Card key={service.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:flex">
                    {/* Icon/Visual Section */}
                    <div className="lg:w-1/3 bg-primary/5 flex items-center justify-center p-12">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <IconComponent className="h-12 w-12 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {service.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/3 p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base text-gray-600">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">What You'll Get:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-gray-600">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Eligibility */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Ideal For:</h4>
                          <p className="text-sm text-gray-600">{service.eligibility}</p>
                        </div>

                        {/* CTA */}
                        <div className="pt-4 border-t border-gray-100">
                          <ServiceApplicationForm serviceName={service.title} />
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that takes your startup from concept to success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Application',
                description: 'Submit your application with your startup idea and current stage'
              },
              {
                step: '02',
                title: 'Assessment',
                description: 'Our experts evaluate your potential and fit for our programs'
              },
              {
                step: '03',
                title: 'Matching',
                description: 'We connect you with the right program, mentors, and resources'
              },
              {
                step: '04',
                title: 'Growth',
                description: 'Execute your growth plan with continuous support and guidance'
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'What stage startups do you work with?',
                answer: 'We support startups at all stages, from pre-seed ideas to Series A companies looking to scale.'
              },
              {
                question: 'Do you take equity in startups?',
                answer: 'Our equity requirements vary by program. Some programs are equity-free, while others involve small equity stakes in exchange for funding.'
              },
              {
                question: 'How long are the programs?',
                answer: 'Program duration varies from 2 weeks for intensive bootcamps to 12 months for comprehensive incubation programs.'
              },
              {
                question: 'What kind of support do you provide?',
                answer: 'We provide mentorship, funding connections, technical resources, legal guidance, and access to our extensive network of partners and investors.'
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Take the first step towards transforming your startup. Apply to our programs today.
          </p>
          <Button size="lg" variant="secondary">
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Programs;