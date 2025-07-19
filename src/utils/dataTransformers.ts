import { Service, Product, Fund, CaseStudy, BlogPost, Event, ContactMessage, Resource, TeamMember, Consulting } from '@/data/cmsData';


export const transformConsultingFromDB = (dbItem: any): Consulting => ({
  id: dbItem.id.toString(),
  title: dbItem.title,
  description: dbItem.description,
  features: typeof dbItem.features === 'string' ? JSON.parse(dbItem.features) : dbItem.features,
  icon: dbItem.icon,
  eligibility: dbItem.eligibility,
  category: dbItem.category,
  directUrl: dbItem.direct_url || undefined,
});

export const transformConsultingToDB = (consulting: Omit<Consulting, 'id'>) => ({
  title: consulting.title,
  description: consulting.description,
  features: JSON.stringify(consulting.features),
  icon: consulting.icon,
  eligibility: consulting.eligibility,
  category: consulting.category,
  directUrl: consulting.directUrl ?? null,
});
// Transform MySQL service to frontend format
export const transformServiceFromDB = (dbService: any): Service => ({
  id: dbService.id.toString(),
  title: dbService.title,
  description: dbService.description,
  features: typeof dbService.features === 'string' ? JSON.parse(dbService.features) : dbService.features,
  icon: dbService.icon,
  duration: dbService.duration,
  eligibility: dbService.eligibility,
  category: dbService.category,
  presentationUrl: dbService.presentation_url || undefined
});

// Transform frontend service to MySQL format
export const transformServiceToDB = (service: Omit<Service, 'id'>): any => ({
  title: service.title,
  description: service.description,
  features: JSON.stringify(service.features),
  icon: service.icon,
  duration: service.duration,
  eligibility: service.eligibility,
  category: service.category,
  presentation_url: service.presentationUrl || null
});

// Transform MySQL product to frontend format
export const transformProductFromDB = (dbProduct: any): Product => ({
  id: dbProduct.id.toString(),
  name: dbProduct.name,
  description: dbProduct.description,
  category: dbProduct.category,
  price: dbProduct.price,
  features: typeof dbProduct.features === 'string' ? JSON.parse(dbProduct.features) : dbProduct.features,
  image: dbProduct.image,
  status: dbProduct.status as 'active' | 'inactive' | 'coming-soon'
});

// Transform frontend product to MySQL format
export const transformProductToDB = (product: Omit<Product, 'id'>): any => ({
  name: product.name,
  description: product.description,
  category: product.category,
  price: product.price,
  features: JSON.stringify(product.features),
  image: product.image,
  status: product.status
});

// Transform MySQL fund to frontend format
export const transformFundFromDB = (dbFund: any): Fund => ({
  id: dbFund.id.toString(),
  name: dbFund.name,
  description: dbFund.description,
  totalSize: dbFund.total_size,
  currentRaise: dbFund.current_raise,
  targetCompanies: dbFund.target_companies,
  stage: dbFund.stage,
  sectors: typeof dbFund.sectors === 'string' ? JSON.parse(dbFund.sectors) : dbFund.sectors,
  status: dbFund.status as 'fundraising' | 'deployed' | 'closed'
});

// Transform frontend fund to MySQL format
export const transformFundToDB = (fund: Omit<Fund, 'id'>): any => ({
  name: fund.name,
  description: fund.description,
  total_size: fund.totalSize,
  current_raise: fund.currentRaise,
  target_companies: fund.targetCompanies,
  stage: fund.stage,
  sectors: JSON.stringify(fund.sectors),
  status: fund.status
});

// Transform MySQL case study to frontend format
export const transformCaseStudyFromDB = (dbCaseStudy: any): CaseStudy => ({
  id: dbCaseStudy.id.toString(),
  companyName: dbCaseStudy.company_name,
  industry: dbCaseStudy.industry,
  description: dbCaseStudy.description,
  challenge: dbCaseStudy.challenge,
  solution: dbCaseStudy.solution,
  results: typeof dbCaseStudy.results === 'string' ? JSON.parse(dbCaseStudy.results) : dbCaseStudy.results,
  image: dbCaseStudy.image,
  testimonial: typeof dbCaseStudy.testimonial === 'string' ? JSON.parse(dbCaseStudy.testimonial) : dbCaseStudy.testimonial,
  tags: typeof dbCaseStudy.tags === 'string' ? JSON.parse(dbCaseStudy.tags) : dbCaseStudy.tags
});

// Transform frontend case study to MySQL format
export const transformCaseStudyToDB = (caseStudy: Omit<CaseStudy, 'id'>): any => ({
  company_name: caseStudy.companyName,
  industry: caseStudy.industry,
  description: caseStudy.description,
  challenge: caseStudy.challenge,
  solution: caseStudy.solution,
  results: JSON.stringify(caseStudy.results),
  image: caseStudy.image,
  testimonial: JSON.stringify(caseStudy.testimonial),
  tags: JSON.stringify(caseStudy.tags)
});

// Transform MySQL blog post to frontend format
export const transformBlogPostFromDB = (dbBlogPost: any): BlogPost => ({
  id: dbBlogPost.id.toString(),
  title: dbBlogPost.title,
  excerpt: dbBlogPost.excerpt,
  content: dbBlogPost.content,
  author: dbBlogPost.author,
  publishDate: dbBlogPost.publish_date,
  image: dbBlogPost.image,
  category: dbBlogPost.category,
  tags: typeof dbBlogPost.tags === 'string' ? JSON.parse(dbBlogPost.tags) : dbBlogPost.tags
});

// Transform frontend blog post to MySQL format
export const transformBlogPostToDB = (blogPost: Omit<BlogPost, 'id'>): any => ({
  title: blogPost.title,
  excerpt: blogPost.excerpt,
  content: blogPost.content,
  author: blogPost.author,
  publish_date: blogPost.publishDate,
  image: blogPost.image,
  category: blogPost.category,
  tags: JSON.stringify(blogPost.tags)
});

// Transform MySQL resource to frontend format
export const transformResourceFromDB = (dbResource: any): Resource => ({
  id: dbResource.id.toString(),
  title: dbResource.title,
  description: dbResource.description,
  type: dbResource.type as 'pitch-deck' | 'financial-model' | 'presentation' | 'guide',
  category: dbResource.category,
  downloadUrl: dbResource.download_url,
  image: dbResource.image,
  tags: typeof dbResource.tags === 'string' ? JSON.parse(dbResource.tags) : dbResource.tags
});

// Transform frontend resource to MySQL format
export const transformResourceToDB = (resource: Omit<Resource, 'id'>): any => ({
  title: resource.title,
  description: resource.description,
  type: resource.type,
  category: resource.category,
  download_url: resource.downloadUrl,
  image: resource.image,
  tags: JSON.stringify(resource.tags)
});

// Transform MySQL event to frontend format
export const transformEventFromDB = (dbEvent: any): Event => ({
  id: dbEvent.id.toString(),
  title: dbEvent.title,
  description: dbEvent.description,
  date: dbEvent.date,
  time: dbEvent.time,
  location: dbEvent.location,
  type: dbEvent.type as 'workshop' | 'webinar' | 'networking' | 'pitch',
  image: dbEvent.image,
  registrationUrl: dbEvent.registration_url
});

// Transform frontend event to MySQL format
export const transformEventToDB = (event: Omit<Event, 'id'>): any => ({
  title: event.title,
  description: event.description,
  date: event.date,
  time: event.time,
  location: event.location,
  type: event.type,
  image: event.image,
  registration_url: event.registrationUrl
});

// Transform MySQL contact message to frontend format
export const transformContactMessageFromDB = (dbMessage: any): ContactMessage => ({
  id: dbMessage.id.toString(),
  name: dbMessage.name,
  email: dbMessage.email,
  subject: dbMessage.subject,
  message: dbMessage.message,
  timestamp: dbMessage.timestamp,
  status: dbMessage.status as 'unread' | 'read' | 'replied'
});

// Transform frontend contact message to MySQL format
export const transformContactMessageToDB = (message: Omit<ContactMessage, 'id'>): any => ({
  name: message.name,
  email: message.email,
  subject: message.subject,
  message: message.message,
  timestamp: message.timestamp,
  status: message.status
});

// Transform MySQL team member to frontend format
export const transformTeamMemberFromDB = (dbMember: any): TeamMember => ({
  id: dbMember.id.toString(),
  name: dbMember.name,
  position: dbMember.position,
  bio: dbMember.bio,
  image: dbMember.image,
  linkedin_url: dbMember.linkedin_url || undefined
});

// Transform frontend team member to MySQL format
export const transformTeamMemberToDB = (member: Omit<TeamMember, 'id'>): any => ({
  name: member.name,
  position: member.position,
  bio: member.bio,
  image: member.image,
  linkedin_url: member.linkedin_url || null
});
