
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminStatsProps {
  services: any[];
  consulting: any[];
  teamMembers: any[];
  products: any[];
  funds: any[];
 
  messages: any[];
  caseStudies: any[];
  blogPosts: any[];
  programsApplications?: any[];
}

const AdminStats = ({ services, teamMembers, products, funds, messages, caseStudies, blogPosts, consulting }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-7">
      {/* <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{services.length}</div>
          <p className="text-sm text-gray-600">Active programs</p>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Consultings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{consulting.length}</div>
          <p className="text-sm text-gray-600">Active Consultings</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
          <p className="text-sm text-gray-600">Team members</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{products.length}</div>
          <p className="text-sm text-gray-600">Active products</p>
        </CardContent>
      </Card>
      
      {/* <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{funds.length}</div>
          <p className="text-sm text-gray-600">Investment </p>
        </CardContent>
      </Card> */}
   

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{messages.filter(m => m.status === 'unread').length}</div>
          <p className="text-sm text-gray-600">Unread messages</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{caseStudies.length}</div>
          <p className="text-sm text-gray-600">Published studies</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-600">Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{blogPosts.length}</div>
          <p className="text-sm text-gray-600">Published posts</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
