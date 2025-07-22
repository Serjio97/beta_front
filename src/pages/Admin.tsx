import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminStats from '@/components/admin/AdminStats';
import ServiceForm from '@/components/admin/ServiceForm';
import ConsultingForm from '@/components/admin/ConsultingForm';
import ProductForm from '@/components/admin/ProductForm';
import FundForm from '@/components/admin/FundForm';
import CaseStudyForm from '@/components/admin/CaseStudyForm';
import BlogPostForm from '@/components/admin/BlogPostForm';
import EventForm from '@/components/admin/EventForm';
import ResourceForm from '@/components/admin/ResourceForm';
import TeamMemberForm from '@/components/admin/TeamMemberForm';
import StyleManagementForm from '@/components/admin/StyleManagementForm';

import PopupManagementDialog from '@/components/admin/PopupManagementDialog';

import AdminManagement from '@/components/admin/AdminManagement';


import { 
  Service, 
  Product, 
  Fund, 
  CaseStudy, 
  BlogPost, 
  Event, 
  Resource, 
  TeamMember,
  Consulting,
  ProgramApplication,
  ContactMessage 
} from '@/data/cmsData';
import { apiService } from '@/services/apiService';
import { 
  transformServiceToDB, 
  transformServiceFromDB,
  transformProductToDB,
  transformProductFromDB,
  transformFundToDB,
  transformFundFromDB,
  transformCaseStudyToDB,
  transformCaseStudyFromDB,
  transformBlogPostToDB,
  transformBlogPostFromDB,
  transformEventToDB,
  transformEventFromDB,
  transformResourceToDB,
  transformResourceFromDB,
  transformTeamMemberToDB,
  transformTeamMemberFromDB,
  transformContactMessageFromDB,
  transformConsultingFromDB,
  transformConsultingToDB

} from '@/utils/dataTransformers';

const Admin = () => {

  // Form states
    const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isFundFormOpen, setIsFundFormOpen] = useState(false);
    const [isCaseStudyFormOpen, setIsCaseStudyFormOpen] = useState(false);
    const [isBlogPostFormOpen, setIsBlogPostFormOpen] = useState(false);
    const [isEventFormOpen, setIsEventFormOpen] = useState(false);
    const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
    const [isTeamMemberFormOpen, setIsTeamMemberFormOpen] = useState(false);
    const [isStyleSettingsOpen, setIsStyleSettingsOpen] = useState(false);
    const [isProgramApplicationFormOpen, setIsProgramApplicationFormOpen] = useState(false);
    const [isConsultingFormOpen, setIsConsultingFormOpen] = useState(false);
    
    const [showPopupManagement, setShowPopupManagement] = useState(false);


  // Edit states
  const [editingService, setEditingService] = useState<Service | undefined>();
  const [editingConsulting, setEditingConsulting] = useState<Consulting | undefined>();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingFund, setEditingFund] = useState<Fund | undefined>();
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | undefined>();
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | undefined>();
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [editingResource, setEditingResource] = useState<Resource | undefined>();
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | undefined>();


  const { isAdminLoggedIn, logout, loading  } = useAdmin();
  const navigate = useNavigate()
  
   // 👇 always call this hook no matter what
  const queryClient = useQueryClient();


  // Queries
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/services');
      return data.map(transformServiceFromDB);
    },
     enabled: isAdminLoggedIn,
  });

    const { data: consulting = [] } = useQuery({
    queryKey: ['consulting'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/consulting');
      return data.map(transformConsultingFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/products');
      return data.map(transformProductFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: funds = [] } = useQuery({
    queryKey: ['funds'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/funds');
      return data.map(transformFundFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: caseStudies = [] } = useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/case-studies');
      return data.map(transformCaseStudyFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: blogPosts = [] } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/blog-posts');
      return data.map(transformBlogPostFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/events');
      return data.map(transformEventFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: programApplications = [] } = useQuery({
  queryKey: ['program-applications'],
  queryFn: async () => {
    const data = await apiService.get<any[]>('/program-applications');
    return data; // no transformation needed unless you want to map/format something
  },
     enabled: isAdminLoggedIn,
});

  const { data: resources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/resources');
      return data.map(transformResourceFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/team-members');
      return data.map(transformTeamMemberFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  const { data: contactMessages = [] } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const data = await apiService.get<any[]>('/contact-messages');
      return data.map(transformContactMessageFromDB);
    },
     enabled: isAdminLoggedIn,
  });

  // Mutations

  
  // Mutations
  
  const createServiceMutation = useMutation({
    mutationFn: (data: Omit<Service, 'id'>) => apiService.post('/services', transformServiceToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create service', variant: 'destructive' });
    }
  });

  const updateServiceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Service, 'id'> }) => 
      apiService.put(`/services/${id}`, transformServiceToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update service', variant: 'destructive' });
    }
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete service', variant: 'destructive' });
    }
  });



  const createConsultingMutation = useMutation({
  mutationFn: (data: Omit<Consulting, 'id'>) => 
    apiService.post('/consulting', transformConsultingToDB(data)),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['consulting'] });
    toast({ title: 'Consulting created successfully' });
  },
  onError: () => {
    toast({ title: 'Failed to create consulting', variant: 'destructive' });
  }
});

const updateConsultingMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Omit<Consulting, 'id'> }) =>
    apiService.put(`/consulting/${id}`, transformConsultingToDB(data)),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['consulting'] });
    toast({ title: 'Consulting updated successfully' });
  },
  onError: () => {
    toast({ title: 'Failed to update consulting', variant: 'destructive' });
  }
});

const deleteConsultingMutation = useMutation({
  mutationFn: (id: string) => apiService.delete(`/consulting/${id}`),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['consulting'] });
    toast({ title: 'Consulting deleted successfully' });
  },
  onError: () => {
    toast({ title: 'Failed to delete consulting', variant: 'destructive' });
  }
});
  // Product mutations
  const createProductMutation = useMutation({
    mutationFn: (data: Omit<Product, 'id'>) => apiService.post('/products', transformProductToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create product', variant: 'destructive' });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Product, 'id'> }) => 
      apiService.put(`/products/${id}`, transformProductToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update product', variant: 'destructive' });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Product deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete product', variant: 'destructive' });
    }
  });

  // Fund mutations
  const createFundMutation = useMutation({
    mutationFn: (data: Omit<Fund, 'id'>) => apiService.post('/funds', transformFundToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funds'] });
      toast({ title: 'Investment post created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create investment post', variant: 'destructive' });
    }
  });

  const updateFundMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Fund, 'id'> }) => 
      apiService.put(`/funds/${id}`, transformFundToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funds'] });
      toast({ title: 'Investment post updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update investment post', variant: 'destructive' });
    }
  });

  const deleteFundMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/funds/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funds'] });
      toast({ title: 'Investment post deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete investment post', variant: 'destructive' });
    }
  });

  // Case Study mutations
  const createCaseStudyMutation = useMutation({
    mutationFn: (data: Omit<CaseStudy, 'id'>) => apiService.post('/case-studies', transformCaseStudyToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      toast({ title: 'Portfolio post created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create portfolio post', variant: 'destructive' });
    }
  });

  const updateCaseStudyMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<CaseStudy, 'id'> }) => 
      apiService.put(`/case-studies/${id}`, transformCaseStudyToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      toast({ title: 'Portfolio post updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update portfolio post', variant: 'destructive' });
    }
  });

  const deleteCaseStudyMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/case-studies/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies'] });
      toast({ title: 'Portfolio post deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete portfoilio post', variant: 'destructive' });
    }
  });

  // Blog Post mutations
  const createBlogPostMutation = useMutation({
    mutationFn: (data: Omit<BlogPost, 'id'>) => apiService.post('/blog-posts', transformBlogPostToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: 'Blog post created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create blog post', variant: 'destructive' });
    }
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<BlogPost, 'id'> }) => 
      apiService.put(`/blog-posts/${id}`, transformBlogPostToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: 'Blog post updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update blog post', variant: 'destructive' });
    }
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/blog-posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: 'Blog post deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete blog post', variant: 'destructive' });
    }
  });

  // Event mutations
  const createEventMutation = useMutation({
    mutationFn: (data: Omit<Event, 'id'>) => apiService.post('/events', transformEventToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Event created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create event', variant: 'destructive' });
    }
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Event, 'id'> }) => 
      apiService.put(`/events/${id}`, transformEventToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Event updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update event', variant: 'destructive' });
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Event deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete event', variant: 'destructive' });
    }
  });

  // Resource mutations
  const createResourceMutation = useMutation({
    mutationFn: (data: Omit<Resource, 'id'>) => apiService.post('/resources', transformResourceToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({ title: 'Resource created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create resource', variant: 'destructive' });
    }
  });

  const updateResourceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Resource, 'id'> }) => 
      apiService.put(`/resources/${id}`, transformResourceToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({ title: 'Resource updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update resource', variant: 'destructive' });
    }
  });

  const deleteResourceMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/resources/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({ title: 'Resource deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete resource', variant: 'destructive' });
    }
  });

  // Team Member mutations
  const createTeamMemberMutation = useMutation({
    mutationFn: (data: Omit<TeamMember, 'id'>) => apiService.post('/team-members', transformTeamMemberToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member created successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to create team member', variant: 'destructive' });
    }
  });

  const updateTeamMemberMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<TeamMember, 'id'> }) => 
      apiService.put(`/team-members/${id}`, transformTeamMemberToDB(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member updated successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to update team member', variant: 'destructive' });
    }
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: (id: string) => apiService.delete(`/team-members/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      toast({ title: 'Team member deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Failed to delete team member', variant: 'destructive' });
    }
  });

  // Handle functions
  const handleServiceSubmit = (data: Omit<Service, 'id'>) => {
    if (editingService) {
      updateServiceMutation.mutate({ id: editingService.id, data });
      setEditingService(undefined);
    } else {
      createServiceMutation.mutate(data);
    }
  };

  const handleProductSubmit = (data: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data });
      setEditingProduct(undefined);
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleFundSubmit = (data: Omit<Fund, 'id'>) => {
    if (editingFund) {
      updateFundMutation.mutate({ id: editingFund.id, data });
      setEditingFund(undefined);
    } else {
      createFundMutation.mutate(data);
    }
  };

  const handleCaseStudySubmit = (data: Omit<CaseStudy, 'id'>) => {
    if (editingCaseStudy) {
      updateCaseStudyMutation.mutate({ id: editingCaseStudy.id, data });
      setEditingCaseStudy(undefined);
    } else {
      createCaseStudyMutation.mutate(data);
    }
  };

  const handleBlogPostSubmit = (data: Omit<BlogPost, 'id'>) => {
    if (editingBlogPost) {
      updateBlogPostMutation.mutate({ id: editingBlogPost.id, data });
      setEditingBlogPost(undefined);
    } else {
      createBlogPostMutation.mutate(data);
    }
  };

  const handleEventSubmit = (data: Omit<Event, 'id'>) => {
    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, data });
      setEditingEvent(undefined);
    } else {
      createEventMutation.mutate(data);
    }
  };

  const handleResourceSubmit = (data: Omit<Resource, 'id'>) => {
    if (editingResource) {
      updateResourceMutation.mutate({ id: editingResource.id, data });
      setEditingResource(undefined);
    } else {
      createResourceMutation.mutate(data);
    }
  };

  const handleTeamMemberSubmit = (data: Omit<TeamMember, 'id'>) => {
  const mappedData = {
    ...data,
  };

  if (editingTeamMember) {
    updateTeamMemberMutation.mutate({ id: editingTeamMember.id, data: mappedData });
    setEditingTeamMember(undefined);
  } else {
    createTeamMemberMutation.mutate(mappedData);
  }
};


const handleConsultingSubmit = (data: Omit<Consulting, 'id'>) => {
  if (editingConsulting) {
    updateConsultingMutation.mutate({ id: editingConsulting.id, data });
    setEditingConsulting(undefined);
  } else {
    createConsultingMutation.mutate(data);
  }
};


  const handleStyleSettingsOpen = () => {
    setIsStyleSettingsOpen(true);
  };

   const handlePopupManagementOpen = () => {
    setShowPopupManagement(true);
  };

  const renderEntityGrid = <T extends { id: string; title?: string; name?: string; companyName?: string }>(
    items: T[],
    onEdit: (item: T) => void,
    onDelete: (id: string) => void,
    titleKey: keyof T = 'title' as keyof T,
    renderContent?: (item: T) => React.ReactNode
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">{String(item[titleKey])}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderContent && renderContent(item)}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(item)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMessagesGrid = () => (
    <div className="grid grid-cols-1 gap-4">
      {contactMessages.map((message) => (
        <Card key={message.id}>
          <CardHeader>
            <CardTitle className="text-lg">{message.subject}</CardTitle>
            <p className="text-sm text-gray-600">From: {message.name} ({message.email})</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-2">{message.message}</p>
            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs ${
                message.status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {message.status}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
  
     useEffect(() => {
    if (!loading && !isAdminLoggedIn) {
      navigate('/admin');
    }
  }, [loading, isAdminLoggedIn, navigate]);

  // ✅ UI guards AFTER all hooks
  if (loading) {
    return <div className="p-10 text-center text-gray-400">Checking admin session...</div>;
  }

  if (!isAdminLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };
  


  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        onLogout={handleLogout}
        onStyleSettingsOpen={handleStyleSettingsOpen}
        onPopupManagementOpen={handlePopupManagementOpen}
      />
      <div className="container mx-auto px-4 py-8">
        <AdminStats 
          services={services}
          consulting={consulting}
          teamMembers={teamMembers}
          products={products}
          funds={funds}
          messages={contactMessages}
          caseStudies={caseStudies}
          blogPosts={blogPosts}
          programsApplications={programApplications}
        />
        
        <Tabs defaultValue="services" className="mt-9">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="blog-posts">Blog Posts</TabsTrigger>
            {/* <TabsTrigger value="services">Programs</TabsTrigger> */}
            <TabsTrigger value="consulting">Consultings</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            {/* <TabsTrigger value="funds">Funds</TabsTrigger> */}
            <TabsTrigger value="case-studies">Portfolio</TabsTrigger>
            {/* <TabsTrigger value="events">Events</TabsTrigger> */}
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            {/* <TabsTrigger value="applications">Applications</TabsTrigger> */}
          </TabsList>

          {/* <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Programs Management</CardTitle>
                  <Button onClick={() => setIsServiceFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Program
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  services,
                  (service) => {
                    setEditingService(service);
                    setIsServiceFormOpen(true);
                  },
                  (id) => deleteServiceMutation.mutate(id),
                  'title',
                  (service) => (
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">{service.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {service.category}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {service.duration}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Eligibility:</strong> {service.eligibility}
                      </div>
                      {service.features.length > 0 && (
                        <div className="text-xs">
                          <strong>Features:</strong>
                          <ul className="list-disc list-inside mt-1 text-gray-600">
                            {service.features.slice(0, 3).map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                            {service.features.length > 3 && (
                              <li>... and {service.features.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {renderMessagesGrid()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <AdminManagement />
          </TabsContent>

          <TabsContent value="consulting" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Consultings Management</CardTitle>
                  <Button onClick={() => setIsConsultingFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add a Consult
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  consulting,
                  (consulting) => {
                    setEditingConsulting(consulting);
                    setIsConsultingFormOpen(true);
                  },
                  (id) => deleteConsultingMutation.mutate(id),
                  'title',
                  (consulting) => (
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">{consulting.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {consulting.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Eligibility:</strong> {consulting.eligibility}
                      </div>
                      {consulting.features.length > 0 && (
                        <div className="text-xs">
                          <strong>Features:</strong>
                          <ul className="list-disc list-inside mt-1 text-gray-600">
                            {consulting.features.slice(0, 3).map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                            {consulting.features.length > 3 && (
                              <li>... and {consulting.features.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Products Management</CardTitle>
                  <Button onClick={() => setIsProductFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  products,
                  (product) => {
                    setEditingProduct(product);
                    setIsProductFormOpen(true);
                  },
                  (id) => deleteProductMutation.mutate(id),
                  'name',
                  (product) => (
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">{product.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {product.category}
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                          {product.price}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' :
                          product.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      {product.features.length > 0 && (
                        <div className="text-xs">
                          <strong>Features:</strong>
                          <ul className="list-disc list-inside mt-1 text-gray-600">
                            {product.features.slice(0, 2).map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                            {product.features.length > 2 && (
                              <li>... and {product.features.length - 2} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funds" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Funds Management</CardTitle>
                  <Button onClick={() => setIsFundFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Investment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  funds,
                  (fund) => {
                    setEditingFund(fund);
                    setIsFundFormOpen(true);
                  },
                  (id) => deleteFundMutation.mutate(id),
                  'name',
                  (fund) => (
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">{fund.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Size:</strong> {fund.totalSize}</div>
                        <div><strong>Raised:</strong> {fund.currentRaise}</div>
                        <div><strong>Stage:</strong> {fund.stage}</div>
                        <div><strong>Companies:</strong> {fund.targetCompanies}</div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {fund.sectors.slice(0, 3).map((sector, index) => (
                          <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                            {sector}
                          </span>
                        ))}
                        {fund.sectors.length > 3 && (
                          <span className="text-xs text-gray-500">+{fund.sectors.length - 3} more</span>
                        )}
                      </div>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        fund.status === 'fundraising' ? 'bg-blue-100 text-blue-800' :
                        fund.status === 'deployed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {fund.status}
                      </span>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="case-studies" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Portfolio Management</CardTitle>
                  <Button onClick={() => setIsCaseStudyFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Portfolio
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  caseStudies,
                  (caseStudy) => {
                    setEditingCaseStudy(caseStudy);
                    setIsCaseStudyFormOpen(true);
                  },
                  (id) => deleteCaseStudyMutation.mutate(id),
                  'companyName',
                  (caseStudy) => (
                    <div className="space-y-2 text-sm">
                      <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs">
                        {caseStudy.industry}
                      </span>
                      <p className="text-gray-700">{caseStudy.description}</p>
                      <div className="text-xs">
                        <div className="mb-1"><strong>Challenge:</strong> {caseStudy.challenge.substring(0, 100)}...</div>
                        <div><strong>Solution:</strong> {caseStudy.solution.substring(0, 100)}...</div>
                      </div>
                      {caseStudy.results.length > 0 && (
                        <div className="text-xs">
                          <strong>Results:</strong>
                          <ul className="list-disc list-inside mt-1 text-gray-600">
                            {caseStudy.results.slice(0, 2).map((result, index) => (
                              <li key={index}>{result}</li>
                            ))}
                            {caseStudy.results.length > 2 && (
                              <li>... and {caseStudy.results.length - 2} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                      <div className="flex gap-1 flex-wrap">
                        {caseStudy.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog-posts" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Blog Posts Management</CardTitle>
                  <Button onClick={() => setIsBlogPostFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blog Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  blogPosts,
                  (blogPost) => {
                    setEditingBlogPost(blogPost);
                    setIsBlogPostFormOpen(true);
                  },
                  (id) => deleteBlogPostMutation.mutate(id),
                  'title',
                  (blogPost) => (
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
                          {blogPost.category}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          By {blogPost.author}
                        </span>
                      </div>
                      <p className="text-gray-700">{blogPost.excerpt}</p>
                      <div className="text-xs text-gray-600">
                        Published: {new Date(blogPost.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {blogPost.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Events Management</CardTitle>
                  <Button onClick={() => setIsEventFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  events,
                  (event) => {
                    setEditingEvent(event);
                    setIsEventFormOpen(true);
                  },
                  (id) => deleteEventMutation.mutate(id),
                  'title',
                  (event) => (
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs">
                          {event.type}
                        </span>
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{event.description}</p>
                      <div className="text-xs">
                        <div><strong>Time:</strong> {event.time}</div>
                        <div><strong>Location:</strong> {event.location}</div>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Resources Management</CardTitle>
                  <Button onClick={() => setIsResourceFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  resources,
                  (resource) => {
                    setEditingResource(resource);
                    setIsResourceFormOpen(true);
                  },
                  (id) => deleteResourceMutation.mutate(id),
                  'title',
                  (resource) => (
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 flex-wrap">
                        <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs">
                          {resource.type}
                        </span>
                        <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs">
                          {resource.category}
                        </span>
                      </div>
                      <p className="text-gray-700">{resource.description}</p>
                      <div className="flex gap-1 flex-wrap">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-lime-100 text-lime-800 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Team Members Management</CardTitle>
                  <Button onClick={() => setIsTeamMemberFormOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderEntityGrid(
                  teamMembers,
                  (member) => {
                    setEditingTeamMember(member);
                    setIsTeamMemberFormOpen(true);
                  },
                  (id) => deleteTeamMemberMutation.mutate(id),
                  'name',
                  (member) => (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{member.position}</div>
                          {member.linkedin_url && (
                            <a 
                              href={member.linkedin_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 text-xs hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700">{member.bio}</p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>

      {/* Forms */}
      <ServiceForm
        isOpen={isServiceFormOpen}
        onClose={() => {
          setIsServiceFormOpen(false);
          setEditingService(undefined);
        }}
        onSubmit={handleServiceSubmit}
        service={editingService}
      />

      <ConsultingForm
  isOpen={isConsultingFormOpen}
  onClose={() => {
    setIsConsultingFormOpen(false);
    setEditingConsulting(undefined);
  }}
  onSubmit={handleConsultingSubmit}
  consulting={editingConsulting}
/>


      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setEditingProduct(undefined);
        }}
        onSubmit={handleProductSubmit}
        product={editingProduct}
      />

      <FundForm
        isOpen={isFundFormOpen}
        onClose={() => {
          setIsFundFormOpen(false);
          setEditingFund(undefined);
        }}
        onSubmit={handleFundSubmit}
        fund={editingFund}
      />

      <CaseStudyForm
        isOpen={isCaseStudyFormOpen}
        onClose={() => {
          setIsCaseStudyFormOpen(false);
          setEditingCaseStudy(undefined);
        }}
        onSubmit={handleCaseStudySubmit}
        caseStudy={editingCaseStudy}
      />

      <BlogPostForm
        isOpen={isBlogPostFormOpen}
        onClose={() => {
          setIsBlogPostFormOpen(false);
          setEditingBlogPost(undefined);
        }}
        onSubmit={handleBlogPostSubmit}
        blogPost={editingBlogPost}
      />

      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => {
          setIsEventFormOpen(false);
          setEditingEvent(undefined);
        }}
        onSubmit={handleEventSubmit}
        event={editingEvent}
      />

      <ResourceForm
        isOpen={isResourceFormOpen}
        onClose={() => {
          setIsResourceFormOpen(false);
          setEditingResource(undefined);
        }}
        onSubmit={handleResourceSubmit}
        resource={editingResource}
      />

      <TeamMemberForm
        isOpen={isTeamMemberFormOpen}
        onClose={() => {
          setIsTeamMemberFormOpen(false);
          setEditingTeamMember(undefined);
        }}
        onSubmit={handleTeamMemberSubmit}
        member={editingTeamMember}
      />
      <StyleManagementForm
  isOpen={isStyleSettingsOpen}
  onClose={() => setIsStyleSettingsOpen(false)}
  onSubmit={(settings) => {
    // Save to localStorage or API (depending on your logic)
    localStorage.setItem('styleSettings', JSON.stringify(settings));
    toast({
      title: "Style updated!",
      description: "The site style settings were successfully updated.",
    });
  }}
  currentSettings={
    JSON.parse(localStorage.getItem('styleSettings') || JSON.stringify({
      heroImage: '',
      runningTextCompanies: [],
      collaborators: [],
    }))
  }
/>
 <PopupManagementDialog 
        open={showPopupManagement} 
        onOpenChange={setShowPopupManagement} 
      />

    </div>
  );
};

export default Admin;
