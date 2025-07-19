import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { CMSService, BlogPost as BlogPostType } from '@/data/cmsData';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const allPosts = await CMSService.getBlogPosts();
        const post = allPosts.find(p => p.id === id);
        setBlogPost(post || null);
        
        // Get related posts (same category, exclude current post)
        if (post) {
          const related = allPosts
            .filter(p => p.category === post.category && p.id !== post.id)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <Badge>{blogPost.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blogPost.publishDate)}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blogPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getReadingTime(blogPost.content)}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blogPost.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {blogPost.excerpt}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold text-lg">
                    {blogPost.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{blogPost.author}</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                 <p>
                    {blogPost.content}
                </p>
                {/* <p>
                  The startup funding landscape is evolving rapidly, driven by technological innovations, changing investor preferences, and global economic shifts. As we move through 2024, entrepreneurs and investors alike are witnessing unprecedented changes in how startups secure funding and scale their operations.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">AI-Driven Due Diligence</h2>
                <p>
                  One of the most significant trends reshaping startup funding is the integration of artificial intelligence in due diligence processes. Traditional due diligence, which often took weeks or months, is now being accelerated through AI-powered analytics that can process vast amounts of data in hours.
                </p>
                
                <p>
                  Investment firms are leveraging machine learning algorithms to analyze market trends, assess competitive landscapes, and evaluate startup potential with unprecedented accuracy. This shift not only speeds up the funding process but also helps investors make more informed decisions based on data-driven insights rather than intuition alone.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sustainable and Impact Investing</h2>
                <p>
                  The rise of environmental, social, and governance (ESG) criteria in investment decisions has created a new category of funding focused on sustainable and impact-driven startups. Investors are increasingly seeking opportunities that generate both financial returns and positive societal impact.
                </p>
                
                <p>
                  This trend is particularly evident in clean technology, healthcare innovation, and social entrepreneurship sectors. Startups that can demonstrate measurable social or environmental impact alongside strong business fundamentals are finding themselves in high demand among impact investors.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Alternative Funding Models</h2>
                <p>
                  Beyond traditional venture capital, alternative funding models are gaining traction. Revenue-based financing, crowdfunding, and tokenization are providing startups with more diverse funding options that align with their specific needs and growth trajectories.
                </p>
                
                <p>
                  These alternative models offer startups more flexibility and control over their equity while providing investors with different risk-return profiles. The democratization of startup funding is opening doors for entrepreneurs who might not have access to traditional venture capital networks.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Looking Ahead</h2>
                <p>
                  As we progress through 2024, the startup funding ecosystem will continue to evolve. The integration of AI, focus on sustainability, and emergence of alternative funding models are just the beginning. Entrepreneurs who stay ahead of these trends and adapt their funding strategies accordingly will be best positioned for success in this dynamic landscape.
                </p> */}
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t">
              {blogPost.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-width section-padding">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {post.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;