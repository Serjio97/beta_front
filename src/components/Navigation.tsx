
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
   const { isAdminLoggedIn } = useAdmin(); 

  const navItems = [
    { name: 'Home', path: '/' },
    // { name: 'Programs', path: '/programs' },
    { name: 'Consulting', path: '/consultings' },
    { name: 'Products', path: '/products' },
    { name: 'Resources', path: '/resources' },
    { name: 'Investment', path: '/fund' },
    { name: 'Portfolio', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    // { name: 'Events', path: '/events' },
    // { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-width section-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
           <img 
  src="/lovable-uploads/H-Betawaves-Logo-Black.png" 
  alt="Betawaves Logo" 
  className="w-30 h-10 object-contain" 
/>

           
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
              {/* <Button asChild variant="outline" size="sm" className="ml-4">
    <Link to={isAdminLoggedIn ? "/admin/dashboard" : "/admin"}>
      <div className="flex items-center space-x-2">
        <Settings size={16} />
        <span>Admin</span>
      </div>
    </Link>
  </Button> */}
            <Button asChild className="ml-2">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div className={`w-5 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-5 h-0.5 bg-gray-600 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* <Link
  to={isAdminLoggedIn ? "/admin/dashboard" : "/admin"}
  className="flex items-center space-x-2 text-sm font-medium px-2 py-1 rounded transition-colors text-gray-600 hover:text-primary hover:bg-gray-50"
  onClick={() => setIsMenuOpen(false)}
>
  <Settings size={16} />
  <span>Admin</span>
</Link> */}

              <Button asChild className="mt-4 w-fit">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
