
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CMSService, BlogPost } from '@/data/cmsData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Utility to strip HTML tags and get plain text
function getPlainTextFromHTML(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

   const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await CMSService.getBlogPosts();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);

    try {
      const res = await fetch('https://betawaves-back.4bzwio.easypanel.host/api/contact-messages', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '',
          email,
          subject: 'Newsletter',
          message: '',
          status: 'unread',
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setSubmitting(false);
    }
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
             <Button variant="outline" size="sm" className="mb-6" asChild>
                        <Link to="/" className="flex items-center space-x-2">
                          <ArrowLeft size={16} />
                          <span>Back to Home</span>
                        </Link>
                      </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Startup <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest trends, tips, and insights from the startup world. 
              Our experts share knowledge to help you navigate your entrepreneurial journey.
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
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-16">
          <div className="container-width section-padding">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Article</h2>
              <p className="text-gray-600">Our latest insights on startup growth and innovation</p>
            </div>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge>{filteredPosts[0].category}</Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(filteredPosts[0].publishDate)}
                      </span>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl mb-4">
                      {filteredPosts[0].title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {filteredPosts[0].excerpt}
                    </CardDescription>
                    {/* Blog content preview */}
                    <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                      {
                        (() => {
                          const plain = getPlainTextFromHTML(filteredPosts[0].content);
                          const words = plain.split(/\s+/).filter(Boolean);
                          const maxWords = 30; // Adjust as needed for card size
                          return words.length > maxWords
                            ? words.slice(0, maxWords).join(' ') + '...'
                            : plain;
                        })()
                      }
                    </p>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary font-semibold">
                            {filteredPosts[0].author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {filteredPosts[0].author}
                          </div>
                          <div className="text-sm text-gray-500">Author</div>
                        </div>
                      </div>
                      <Link 
                        to={`/blog/${filteredPosts[0].id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.publishDate)}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                        <span className="text-primary font-semibold text-sm">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Read →
                    </Link>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary text-white">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest startup insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
            {success && <p className="text-green-400 mt-2">Subscribed successfully!</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
