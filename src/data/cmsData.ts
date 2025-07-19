// Mock CMS data structure - simulates headless CMS content
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  duration: string;
  eligibility: string;
  category: string;
  presentationUrl?: string;
}

export interface Consulting {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  eligibility: string;
  category: string;
  directUrl?: string;
}

export interface Popup {
  id: string;
  title: string;
  subject: string;
  description: string;
  image: string;
  link: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  features: string[];
  image: string;
  status: 'active' | 'inactive' | 'coming-soon';
}

export interface Fund {
  id: string;
  name: string;
  description: string;
  totalSize: string;
  currentRaise: string;
  targetCompanies: string;
  stage: string;
  sectors: string[];
  status: 'fundraising' | 'deployed' | 'closed';
}

export interface CaseStudy {
  id: string;
  companyName: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  image: string;
  category: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'webinar' | 'networking' | 'pitch';
  image: string;
  registrationUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pitch-deck' | 'financial-model' | 'presentation' | 'guide';
  category: string;
  downloadUrl: string;
  image: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin_url?: string;
}

export interface ProgramApplication {
  id: string;
  programId: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
}

// Mock data
export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Startup Incubation',
    description: 'Transform your innovative idea into a viable business with our comprehensive incubation program.',
    features: [
      'Mentorship from industry experts',
      'Access to funding networks',
      'Product development support',
      'Business model validation',
      'Legal and compliance guidance'
    ],
    icon: 'home',
    duration: '6-12 months',
    eligibility: 'Early-stage startups with innovative ideas',
    category: 'incubation',
    presentationUrl: '/presentations/startup-incubation.pdf'
  },
  {
    id: '2',
    title: 'Acceleration Program',
    description: 'Scale your startup rapidly with our intensive acceleration program designed for growth-ready companies.',
    features: [
      'Growth strategy development',
      'Market expansion support',
      'Investor connections',
      'Partnership facilitation',
      'Performance tracking'
    ],
    icon: 'arrow-up',
    duration: '3-6 months',
    eligibility: 'Startups with proven traction and revenue',
    category: 'acceleration',
    presentationUrl: '/presentations/acceleration-program.pdf'
  },
  {
    id: '3',
    title: 'Bootcamp Programs',
    description: 'Intensive skill-building bootcamps covering essential startup competencies and technologies.',
    features: [
      'Technical skill development',
      'Business fundamentals',
      'Pitch training',
      'Team building workshops',
      'Industry-specific training'
    ],
    icon: 'book',
    duration: '2-8 weeks',
    eligibility: 'Entrepreneurs and startup team members',
    category: 'mentorship'
  },
  {
    id: '4',
    title: 'CXO Academy',
    description: 'Executive leadership development program for startup founders and C-level executives.',
    features: [
      'Leadership coaching',
      'Strategic planning',
      'Board management',
      'Investor relations',
      'Crisis management'
    ],
    icon: 'users',
    duration: '3-4 months',
    eligibility: 'Startup founders and senior executives',
    category: 'mentorship'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'StartupOS Platform',
    description: 'All-in-one platform for managing your startup operations, from funding to team management.',
    category: 'Software',
    price: '$99/month',
    features: [
      'Investor dashboard',
      'Team collaboration tools',
      'Financial tracking',
      'Milestone management',
      'Document storage'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    status: 'active'
  },
  {
    id: '2',
    name: 'Mentorship Marketplace',
    description: 'Connect with experienced mentors and industry experts for personalized guidance.',
    category: 'Service',
    price: '$149/month',
    features: [
      '1-on-1 mentorship sessions',
      'Industry expert network',
      'Goal tracking',
      'Progress analytics',
      'Resource library'
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
    status: 'active'
  },
  {
    id: '3',
    name: 'AI Analytics Suite',
    description: 'Advanced AI-powered analytics and insights for data-driven decision making.',
    category: 'Analytics',
    price: '$199/month',
    features: [
      'Predictive analytics',
      'Real-time dashboards',
      'Custom reports',
      'Data visualization',
      'API integration'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    status: 'coming-soon'
  }
];

export const mockFunds: Fund[] = [
  {
    id: '1',
    name: 'Betawaves Seed Fund I',
    description: 'Early-stage fund focused on pre-seed and seed investments in innovative startups.',
    totalSize: '$50M',
    currentRaise: '$35M',
    targetCompanies: '25-30',
    stage: 'Pre-seed to Seed',
    sectors: ['FinTech', 'HealthTech', 'AI/ML', 'SaaS'],
    status: 'fundraising'
  },
  {
    id: '2',
    name: 'Betawaves Growth Fund',
    description: 'Growth-stage fund for scaling proven startups with strong market traction.',
    totalSize: '$100M',
    currentRaise: '$100M',
    targetCompanies: '15-20',
    stage: 'Series A to B',
    sectors: ['Enterprise Software', 'CleanTech', 'E-commerce', 'EdTech'],
    status: 'deployed'
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    companyName: 'TechFlow AI',
    industry: 'Artificial Intelligence',
    description: 'An AI-powered workflow automation platform for small businesses.',
    challenge: 'TechFlow AI needed to validate their product-market fit and secure Series A funding.',
    solution: 'Through our acceleration program, we helped them refine their go-to-market strategy and connect with key investors.',
    results: [
      'Secured $2.5M Series A funding',
      'Grew from 50 to 500+ enterprise customers',
      'Expanded to 3 new markets',
      'Built strategic partnerships with major tech companies'
    ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    testimonial: {
      quote: "Betawaves didn't just provide funding - they gave us the strategic guidance and network access that transformed our startup into a market leader.",
      author: 'Sarah Chen',
      position: 'CEO & Founder'
    },
    tags: ['AI', 'B2B', 'Series A', 'Acceleration']
  },
  {
    id: '2',
    companyName: 'GreenEnergy Solutions',
    industry: 'Clean Technology',
    description: 'Sustainable energy solutions for residential and commercial properties.',
    challenge: 'Needed technical expertise and regulatory guidance to bring their solar technology to market.',
    solution: 'Our incubation program provided technical mentorship and helped navigate complex energy regulations.',
    results: [
      'Successfully launched in 5 states',
      'Achieved 40% cost reduction in manufacturing',
      'Installed 1000+ solar systems',
      'Won 3 industry innovation awards'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    testimonial: {
      quote: "The technical mentorship and industry connections from Betawaves were crucial in helping us overcome regulatory hurdles and scale our operations.",
      author: 'Michael Rodriguez',
      position: 'CTO & Co-founder'
    },
    tags: ['CleanTech', 'B2C', 'Incubation', 'Sustainability']
  },
  {
    id: '3',
    companyName: 'HealthTrack Pro',
    industry: 'Healthcare Technology',
    description: 'Digital health platform connecting patients with healthcare providers.',
    challenge: 'Required HIPAA compliance expertise and healthcare industry partnerships.',
    solution: 'Our CXO Academy helped the founders develop healthcare industry expertise and regulatory compliance.',
    results: [
      'Achieved HIPAA compliance certification',
      'Partnered with 50+ healthcare providers',
      'Served 10,000+ patients',
      'Reduced patient wait times by 60%'
    ],
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
    testimonial: {
      quote: "The CXO Academy gave us the leadership skills and industry knowledge needed to navigate the complex healthcare landscape successfully.",
      author: 'Dr. Emily Watson',
      position: 'CEO & Founder'
    },
    tags: ['HealthTech', 'B2B2C', 'CXO Academy', 'Compliance']
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Startup Funding: Trends to Watch in 2024',
    excerpt: 'Explore the emerging trends in startup funding, from AI-driven due diligence to sustainable investing.',
    content: 'The startup funding landscape is evolving rapidly...',
    author: 'Alex Johnson',
    publishDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    category: 'Funding',
    tags: ['Funding', 'Trends', 'Investment', 'Startups']
  },
  {
    id: '2',
    title: 'Building a Winning Pitch Deck: A Comprehensive Guide',
    excerpt: 'Learn how to create compelling pitch decks that capture investor attention and secure funding.',
    content: 'A great pitch deck tells a story...',
    author: 'Maria Santos',
    publishDate: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop',
    category: 'Resources',
    tags: ['Pitch Deck', 'Investment', 'Presentation', 'Fundraising']
  },
  {
    id: '3',
    title: 'The Rise of AI in Startup Operations',
    excerpt: 'How artificial intelligence is transforming startup operations and creating new opportunities.',
    content: 'Artificial intelligence is no longer just a buzzword...',
    author: 'David Kim',
    publishDate: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    category: 'Technology',
    tags: ['AI', 'Operations', 'Automation', 'Innovation']
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Startup Pitch Night',
    description: 'Join us for an evening of innovative pitches from emerging startups seeking funding and partnerships.',
    date: '2024-02-15',
    time: '18:00',
    location: 'Betawaves Innovation Hub, San Francisco',
    type: 'pitch',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop',
    registrationUrl: '#'
  },
  {
    id: '2',
    title: 'AI for Startups Workshop',
    description: 'Learn how to integrate AI technologies into your startup to drive growth and efficiency.',
    date: '2024-02-20',
    time: '14:00',
    location: 'Virtual Event',
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    registrationUrl: '#'
  },
  {
    id: '3',
    title: 'Founder Networking Mixer',
    description: 'Connect with fellow entrepreneurs, investors, and industry experts in a relaxed networking environment.',
    date: '2024-02-25',
    time: '17:30',
    location: 'TechHub Downtown, Austin',
    type: 'networking',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    registrationUrl: '#'
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Startup Pitch Deck Template',
    description: 'Professional pitch deck template with 15 essential slides for fundraising success.',
    type: 'pitch-deck',
    category: 'Fundraising',
    downloadUrl: '/resources/pitch-deck-template.pdf',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop',
    tags: ['Pitch Deck', 'Template', 'Fundraising']
  },
  {
    id: '2',
    title: 'Financial Model Template',
    description: 'Complete financial modeling spreadsheet with 3-year projections and scenario analysis.',
    type: 'financial-model',
    category: 'Finance',
    downloadUrl: '/resources/financial-model.xlsx',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    tags: ['Financial Model', 'Excel', 'Planning']
  },
  {
    id: '3',
    title: 'Market Research Guide',
    description: 'Step-by-step guide to conducting effective market research for your startup.',
    type: 'guide',
    category: 'Research',
    downloadUrl: '/resources/market-research-guide.pdf',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['Market Research', 'Guide', 'Strategy']
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'CEO & Founder',
    bio: 'Former VP at Google Ventures with 15+ years in startup ecosystem. Led 50+ successful exits.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    linkedin_url: 'https://linkedin.com/in/sarahjohnson'
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'CTO & Co-founder',
    bio: 'Tech veteran from Meta and Uber. Expert in scaling tech teams and building innovative products.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    linkedin_url: 'https://linkedin.com/in/michaelchen'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Head of Programs',
    bio: 'MBA from Stanford. Previously at Y Combinator, managed over 200 startup accelerations.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    linkedin_url: 'https://linkedin.com/in/emilyrodriguez'
  },
  {
    id: '4',
    name: 'David Park',
    position: 'Investment Director',
    bio: 'Former Goldman Sachs analyst. Specialized in early-stage funding and venture capital.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    linkedin_url: 'https://linkedin.com/in/davidpark'
  }
];

// Mock contact messages data
const mockContactMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techstartup.com',
    subject: 'Inquiry about Incubation Program',
    message: 'Hi, I\'m interested in learning more about your incubation program. My startup is in the fintech space and we\'re looking for mentorship and funding opportunities.',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'unread'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mike@innovativeai.com',
    subject: 'Partnership Opportunity',
    message: 'Hello, I represent an AI startup that has developed a revolutionary machine learning platform. We\'d like to explore potential partnership opportunities with Betawaves.',
    timestamp: '2024-01-14T14:20:00Z',
    status: 'read'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@greentech.io',
    subject: 'Application Status Follow-up',
    message: 'I submitted an application for the Acceleration Program last week and wanted to follow up on the status. Could you please provide an update?',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'replied'
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david@healthinnovate.com',
    subject: 'Speaking Opportunity',
    message: 'I\'d like to propose speaking at one of your upcoming events. I\'m the founder of a successful healthtech startup and would love to share our journey.',
    timestamp: '2024-01-12T16:45:00Z',
    status: 'unread'
  }
];

const mockProgramApplications: ProgramApplication[] = [
  {
    id: '1',
    programId: '1',
    name: 'John Smith',
    email: 'john@startup.com',
    company: 'TechFlow Solutions',
    phone: '+1234567890',
    message: 'We are an early-stage fintech startup looking for incubation support.',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'pending'
  }
];

import { apiService, APIError } from '@/services/apiService';

import {
  transformServiceFromDB,
  transformServiceToDB,
  transformProductFromDB,
  transformProductToDB,
  transformFundFromDB,
  transformFundToDB,
  transformCaseStudyFromDB,
  transformCaseStudyToDB,
  transformBlogPostFromDB,
  transformBlogPostToDB,
  transformResourceFromDB,
  transformResourceToDB,
  transformEventFromDB,
  transformEventToDB,
  transformContactMessageFromDB,
  transformContactMessageToDB,
  transformTeamMemberFromDB,
  transformTeamMemberToDB,
  transformConsultingFromDB,
  transformConsultingToDB,
} from '@/utils/dataTransformers';

export const CMSService = {
  async getServices(): Promise<Service[]> {
    try {
      const dbServices = await apiService.get<any[]>('/services');
      return dbServices.map(transformServiceFromDB);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback to mock data if API fails
      return mockServices;
    }
  },

  async createService(serviceData: Omit<Service, 'id'>): Promise<Service> {
    try {
      const dbData = transformServiceToDB(serviceData);
      const response = await apiService.post<any>('/services', dbData);
      return transformServiceFromDB(response);
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  },

  async updateService(id: string, serviceData: Omit<Service, 'id'>): Promise<Service> {
    try {
      const dbData = transformServiceToDB(serviceData);
      const response = await apiService.put<any>(`/services/${id}`, dbData);
      return transformServiceFromDB(response);
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  },

  async deleteService(id: string): Promise<void> {
    try {
      await apiService.delete(`/services/${id}`);
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new Error('Failed to delete service');
    }
  },
    async getConsulting(): Promise<Consulting[]> {
    try {
      const data = await apiService.get<any[]>('/consulting');
      return data.map(transformConsultingFromDB);
    } catch (error) {
      console.error('Error fetching consulting:', error);
      return [];
    }
  },

  async getConsultings(): Promise<Consulting[]> {
  const dbConsultings = await apiService.get<any[]>('/consultings');
  return dbConsultings.map(transformConsultingFromDB);
}
,

  async createConsulting(data: Omit<Consulting, 'id'>): Promise<Consulting> {
    try {
      const dbData = transformConsultingToDB(data);
      const response = await apiService.post<any>('/consulting', dbData);
      return transformConsultingFromDB(response);
    } catch (error) {
      console.error('Error creating consulting entry:', error);
      throw new Error('Failed to create consulting');
    }
  },

  async updateConsulting(id: string, data: Omit<Consulting, 'id'>): Promise<Consulting> {
    try {
      const dbData = transformConsultingToDB(data);
      const response = await apiService.put<any>(`/consulting/${id}`, dbData);
      return transformConsultingFromDB(response);
    } catch (error) {
      console.error('Error updating consulting entry:', error);
      throw new Error('Failed to update consulting');
    }
  },

  async deleteConsulting(id: string): Promise<void> {
    try {
      await apiService.delete(`/consulting/${id}`);
    } catch (error) {
      console.error('Error deleting consulting entry:', error);
      throw new Error('Failed to delete consulting');
    }
  },

  async getProducts(): Promise<Product[]> {
    try {
      const dbProducts = await apiService.get<any[]>('/products');
      return dbProducts.map(transformProductFromDB);
    } catch (error) {
      console.error('Error fetching products:', error);
      return mockProducts;
    }
  },

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const dbData = transformProductToDB(productData);
      const response = await apiService.post<any>('/products', dbData);
      return transformProductFromDB(response);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  },

  async updateProduct(id: string, productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const dbData = transformProductToDB(productData);
      const response = await apiService.put<any>(`/products/${id}`, dbData);
      return transformProductFromDB(response);
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      await apiService.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  },

  async getFunds(): Promise<Fund[]> {
    try {
      const dbFunds = await apiService.get<any[]>('/funds');
      return dbFunds.map(transformFundFromDB);
    } catch (error) {
      console.error('Error fetching funds:', error);
      return mockFunds;
    }
  },

  async createFund(fundData: Omit<Fund, 'id'>): Promise<Fund> {
    try {
      const dbData = transformFundToDB(fundData);
      const response = await apiService.post<any>('/funds', dbData);
      return transformFundFromDB(response);
    } catch (error) {
      console.error('Error creating fund:', error);
      throw new Error('Failed to create fund');
    }
  },

  async updateFund(id: string, fundData: Omit<Fund, 'id'>): Promise<Fund> {
    try {
      const dbData = transformFundToDB(fundData);
      const response = await apiService.put<any>(`/funds/${id}`, dbData);
      return transformFundFromDB(response);
    } catch (error) {
      console.error('Error updating fund:', error);
      throw new Error('Failed to update fund');
    }
  },

  async deleteFund(id: string): Promise<void> {
    try {
      await apiService.delete(`/funds/${id}`);
    } catch (error) {
      console.error('Error deleting fund:', error);
      throw new Error('Failed to delete fund');
    }
  },

  async getCaseStudies(): Promise<CaseStudy[]> {
    try {
      const dbCaseStudies = await apiService.get<any[]>('/case-studies');
      return dbCaseStudies.map(transformCaseStudyFromDB);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      return mockCaseStudies;
    }
  },

  async createCaseStudy(caseStudyData: Omit<CaseStudy, 'id'>): Promise<CaseStudy> {
    try {
      const dbData = transformCaseStudyToDB(caseStudyData);
      const response = await apiService.post<any>('/case-studies', dbData);
      return transformCaseStudyFromDB(response);
    } catch (error) {
      console.error('Error creating case study:', error);
      throw new Error('Failed to create case study');
    }
  },

  async updateCaseStudy(id: string, caseStudyData: Omit<CaseStudy, 'id'>): Promise<CaseStudy> {
    try {
      const dbData = transformCaseStudyToDB(caseStudyData);
      const response = await apiService.put<any>(`/case-studies/${id}`, dbData);
      return transformCaseStudyFromDB(response);
    } catch (error) {
      console.error('Error updating case study:', error);
      throw new Error('Failed to update case study');
    }
  },

  async deleteCaseStudy(id: string): Promise<void> {
    try {
      await apiService.delete(`/case-studies/${id}`);
    } catch (error) {
      console.error('Error deleting case study:', error);
      throw new Error('Failed to delete case study');
    }
  },

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const dbBlogPosts = await apiService.get<any[]>('/blog-posts');
      return dbBlogPosts.map(transformBlogPostFromDB);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return mockBlogPosts;
    }
  },

  async createBlogPost(blogPostData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    try {
      const dbData = transformBlogPostToDB(blogPostData);
      const response = await apiService.post<any>('/blog-posts', dbData);
      return transformBlogPostFromDB(response);
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  },

  async updateBlogPost(id: string, blogPostData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    try {
      const dbData = transformBlogPostToDB(blogPostData);
      const response = await apiService.put<any>(`/blog-posts/${id}`, dbData);
      return transformBlogPostFromDB(response);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  },

  async deleteBlogPost(id: string): Promise<void> {
    try {
      await apiService.delete(`/blog-posts/${id}`);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  },

  async getEvents(): Promise<Event[]> {
    try {
      const dbEvents = await apiService.get<any[]>('/events');
      return dbEvents.map(transformEventFromDB);
    } catch (error) {
      console.error('Error fetching events:', error);
      return mockEvents;
    }
  },

  async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    try {
      const dbData = transformEventToDB(eventData);
      const response = await apiService.post<any>('/events', dbData);
      return transformEventFromDB(response);
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  },

  async updateEvent(id: string, eventData: Omit<Event, 'id'>): Promise<Event> {
    try {
      const dbData = transformEventToDB(eventData);
      const response = await apiService.put<any>(`/events/${id}`, dbData);
      return transformEventFromDB(response);
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Failed to update event');
    }
  },

  async deleteEvent(id: string): Promise<void> {
    try {
      await apiService.delete(`/events/${id}`);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Failed to delete event');
    }
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const dbMessages = await apiService.get<any[]>('/contact-messages');
      return dbMessages.map(transformContactMessageFromDB);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return mockContactMessages;
    }
  },

  async createContactMessage(messageData: Omit<ContactMessage, 'id'>): Promise<ContactMessage> {
    try {
      const dbData = transformContactMessageToDB(messageData);
      const response = await apiService.post<any>('/contact-messages', dbData);
      return transformContactMessageFromDB(response);
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw new Error('Failed to create contact message');
    }
  },

  async updateContactMessage(id: string, messageData: Omit<ContactMessage, 'id'>): Promise<ContactMessage> {
    try {
      const dbData = transformContactMessageToDB(messageData);
      const response = await apiService.put<any>(`/contact-messages/${id}`, dbData);
      return transformContactMessageFromDB(response);
    } catch (error) {
      console.error('Error updating contact message:', error);
      throw new Error('Failed to update contact message');
    }
  },

  async deleteContactMessage(id: string): Promise<void> {
    try {
      await apiService.delete(`/contact-messages/${id}`);
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw new Error('Failed to delete contact message');
    }
  },

  async getResources(): Promise<Resource[]> {
    try {
      const dbResources = await apiService.get<any[]>('/resources');
      return dbResources.map(transformResourceFromDB);
    } catch (error) {
      console.error('Error fetching resources:', error);
      return mockResources;
    }
  },

  async createResource(resourceData: Omit<Resource, 'id'>): Promise<Resource> {
    try {
      const dbData = transformResourceToDB(resourceData);
      const response = await apiService.post<any>('/resources', dbData);
      return transformResourceFromDB(response);
    } catch (error) {
      console.error('Error creating resource:', error);
      throw new Error('Failed to create resource');
    }
  },

  async updateResource(id: string, resourceData: Omit<Resource, 'id'>): Promise<Resource> {
    try {
      const dbData = transformResourceToDB(resourceData);
      const response = await apiService.put<any>(`/resources/${id}`, dbData);
      return transformResourceFromDB(response);
    } catch (error) {
      console.error('Error updating resource:', error);
      throw new Error('Failed to update resource');
    }
  },

  async deleteResource(id: string): Promise<void> {
    try {
      await apiService.delete(`/resources/${id}`);
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw new Error('Failed to delete resource');
    }
  },

  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const dbTeamMembers = await apiService.get<any[]>('/team-members');
      return dbTeamMembers.map(transformTeamMemberFromDB);
    } catch (error) {
      console.error('Error fetching team members:', error);
      return mockTeamMembers;
    }
  },

  async createTeamMember(memberData: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    try {
      const dbData = transformTeamMemberToDB(memberData);
      const response = await apiService.post<any>('/team-members', dbData);
      return transformTeamMemberFromDB(response);
    } catch (error) {
      console.error('Error creating team member:', error);
      throw new Error('Failed to create team member');
    }
  },

  async updateTeamMember(id: string, memberData: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    try {
      const dbData = transformTeamMemberToDB(memberData);
      const response = await apiService.put<any>(`/team-members/${id}`, dbData);
      return transformTeamMemberFromDB(response);
    } catch (error) {
      console.error('Error updating team member:', error);
      throw new Error('Failed to update team member');
    }
  },

  async deleteTeamMember(id: string): Promise<void> {
    try {
      await apiService.delete(`/team-members/${id}`);
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw new Error('Failed to delete team member');
    }
  },

  async getProgramApplications(): Promise<ProgramApplication[]> {
    try {
      const dbApplications = await apiService.get<any[]>('/program-applications');
      return dbApplications.map(app => ({
        id: app.id.toString(),
        programId: app.program_id.toString(),
        name: app.name,
        email: app.email,
        company: app.company,
        phone: app.phone,
        message: app.message,
        timestamp: app.timestamp,
        status: app.status as 'pending' | 'approved' | 'rejected'
      }));
    } catch (error) {
      console.error('Error fetching program applications:', error);
      return mockProgramApplications;
    }
  },

  async createProgramApplication(applicationData: Omit<ProgramApplication, 'id'>): Promise<ProgramApplication> {
    try {
      const dbData = {
        program_id: parseInt(applicationData.programId),
        name: applicationData.name,
        email: applicationData.email,
        company: applicationData.company,
        phone: applicationData.phone,
        message: applicationData.message,
        timestamp: applicationData.timestamp,
        status: applicationData.status
      };
      const response = await apiService.post<any>('/program-applications', dbData);
      return {
        id: response.id.toString(),
        programId: response.program_id.toString(),
        name: response.name,
        email: response.email,
        company: response.company,
        phone: response.phone,
        message: response.message,
        timestamp: response.timestamp,
        status: response.status
      };
    } catch (error) {
      console.error('Error creating program application:', error);
      throw new Error('Failed to create program application');
    }
  },

  async updateProgramApplication(id: string, applicationData: Omit<ProgramApplication, 'id'>): Promise<ProgramApplication> {
    try {
      const dbData = {
        program_id: parseInt(applicationData.programId),
        name: applicationData.name,
        email: applicationData.email,
        company: applicationData.company,
        phone: applicationData.phone,
        message: applicationData.message,
        timestamp: applicationData.timestamp,
        status: applicationData.status
      };
      const response = await apiService.put<any>(`/program-applications/${id}`, dbData);
      return {
        id: response.id.toString(),
        programId: response.program_id.toString(),
        name: response.name,
        email: response.email,
        company: response.company,
        phone: response.phone,
        message: response.message,
        timestamp: response.timestamp,
        status: response.status
      };
    } catch (error) {
      console.error('Error updating program application:', error);
      throw new Error('Failed to update program application');
    }
  },

  async deleteProgramApplication(id: string): Promise<void> {
    try {
      await apiService.delete(`/program-applications/${id}`);
    } catch (error) {
      console.error('Error deleting program application:', error);
      throw new Error('Failed to delete program application');
    }
  },

   async getPopup(): Promise<Popup | null> {
    try {
      return await apiService.get('/popup');
    } catch (error) {
      console.error('Error fetching popup:', error);
      return null;
    }
  },
  updatePopup: async (formData) => {
  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'image' && value instanceof File) {
      data.append('image', value); // upload file
    } else {
      data.append(key, String(value));
    }
  });

  await fetch('http://betawaves_back:3100/api/popup/update', { 
    method: 'POST',
    body: data
  });
}

  
};
