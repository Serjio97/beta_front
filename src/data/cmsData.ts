// Mock CMS data structure - simulates headless CMS content
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  duration: string;
  eligibility: string;
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
    eligibility: 'Early-stage startups with innovative ideas'
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
    eligibility: 'Startups with proven traction and revenue'
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
    eligibility: 'Entrepreneurs and startup team members'
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
    eligibility: 'Startup founders and senior executives'
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

export const CMSService = {
  async getServices(): Promise<Service[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockServices;
  },

  async getCaseStudies(): Promise<CaseStudy[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockCaseStudies;
  },

  async getBlogPosts(): Promise<BlogPost[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockBlogPosts;
  },

  async getEvents(): Promise<Event[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockEvents;
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockContactMessages;
  },

  async addBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    mockBlogPosts.unshift(newPost);
    return newPost;
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = mockBlogPosts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    mockBlogPosts[index] = { ...mockBlogPosts[index], ...updates };
    return mockBlogPosts[index];
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = mockBlogPosts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    mockBlogPosts.splice(index, 1);
    return true;
  }
};
