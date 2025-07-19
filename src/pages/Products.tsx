
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bot, Search, Target } from 'lucide-react';
import { CMSService, Product } from '@/data/cmsData';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await CMSService.getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Software', label: 'Software' },
    { value: 'Service', label: 'Service' },
    { value: 'Analytics', label: 'Analytics' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'coming-soon':
        return <Badge className="bg-blue-100 text-blue-800">Coming Soon</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return null;
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
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Innovative tools and platforms designed to empower startups, investors, and organizations 
              with data-driven insights and comprehensive evaluation frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container-width section-padding">
          {/* Filter */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Filter by category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline">{product.category}</Badge>
                    {getStatusBadge(product.status)}
                  </div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {product.description}
                  </CardDescription>
                  <div className="text-xl font-bold text-primary mt-2">{product.price}</div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow justify-between">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
  className="w-full mt-auto"
  disabled={product.status !== 'active'}
  onClick={() => {
    if (product.status === 'active' && product.image) {
      window.open(product.image, '_blank');
    }
  }}
>
  {product.status === 'coming-soon' ? 'Coming Soon' : 'Get Started'}
</Button>

                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Explore Our Products?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn more about how our products can support 
            your startup journey or investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/resources">View Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
