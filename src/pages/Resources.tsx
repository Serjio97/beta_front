
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Calculator, Presentation, BookOpen } from 'lucide-react';
import { CMSService, Resource } from '@/data/cmsData';
import ResourceDownloadForm from '@/components/ResourceDownloadForm';

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourcesData = await CMSService.getResources();
        setResources(resourcesData);
        setFilteredResources(resourcesData);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(resource => resource.type === selectedType));
    }
  }, [selectedType, resources]);

const handleDownloadClick = (resource: Resource) => {
  if (resource.downloadUrl) {
    window.open(resource.downloadUrl, '_blank');
  } else {
    console.warn('No download URL for this resource.');
  }
};


  const getIcon = (type: string) => {
    const icons = {
      'pitch-deck': Presentation,
      'financial-model': Calculator,
      'presentation': Presentation,
      'guide': BookOpen
    };
    return icons[type as keyof typeof icons] || FileText;
  };

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'pitch-deck', label: 'Pitch Decks' },
    { value: 'financial-model', label: 'Financial Models' },
    { value: 'presentation', label: 'Presentations' },
    { value: 'guide', label: 'Guides' }
  ];

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
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <Button variant="outline" size="sm" className="mb-6" asChild>
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Startup <span className="gradient-text">Resources</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Access essential templates, guides, and tools to accelerate your startup journey. 
              From pitch decks to financial models, everything you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-8 md:py-20">
        <div className="container-width section-padding">
          {/* Filter */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Filter by type:</span>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredResources.map((resource) => {
              const IconComponent = getIcon(resource.type);
              return (
                <Card key={resource.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {resource.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-6">
                      {resource.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleDownloadClick(resource)}
                    >
                      <Download size={16} className="mr-2" />
                      Get Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No resources found for the selected type.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need More Support?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our resources are just the beginning. Join our programs for personalized guidance 
            and expert mentorship to take your startup to the next level.
          </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="https://hubs.ly/Q03yCr_T0" target="_blank" rel="noopener noreferrer">Download Our Brochure</a>
            </Button>
          </div>
        </div>
      </section>

      <ResourceDownloadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        resource={selectedResource}
      />
    </div>
  );
};

export default Resources;
