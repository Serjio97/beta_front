import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { CMSService, BlogPost as BlogPostType } from '@/data/cmsData';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const { toast } = useToast();

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

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: blogPost?.title || 'Blog Post',
      text: blogPost?.excerpt || '',
      url: currentUrl,
    };

    // Check if native Web Share API is supported
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "The blog post has been shared!",
        });
      } catch (error) {
        // User cancelled or sharing failed, fallback to clipboard
        handleCopyLink(currentUrl);
      }
    } else {
      // Fallback to copying link to clipboard
      handleCopyLink(currentUrl);
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Blog post link has been copied to clipboard.",
      });
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast({
          title: "Link copied!",
          description: "Blog post link has been copied to clipboard.",
        });
      } catch (fallbackError) {
        toast({
          title: "Share failed",
          description: "Unable to copy link. Please copy the URL manually.",
          variant: "destructive",
        });
      }
      document.body.removeChild(textArea);
    }
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
              
              <Button variant="outline" size="sm" className="ml-auto" onClick={handleShare}>
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
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
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