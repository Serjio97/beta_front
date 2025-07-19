
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

   const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:3000/api/contact-messages', {
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

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-width section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
           {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
           <img 
  src="/lovable-uploads/H-Betawaves-Logo-White.png" 
  alt="Betawaves Logo" 
  className="w-30 h-10 object-contain" 
/>

           
          </Link>

            <p className="text-gray-400 mb-4 max-w-md">
              We provide innovation services, early-stage investment, and ecosystem support across the region.
              From building startup programs and advising corporates and governments to co-creating ventures,
              we help ideas grow and markets connect.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/betawavesstudio/" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {/* <li><Link to="/services" className="hover:text-white transition-colors">Programs</Link></li> */}
              <li><Link to="/consultings" className="hover:text-white transition-colors">Innovation Consultings</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/fund" className="hover:text-white transition-colors">Investment</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="container-width section-padding text-center">
          <h2 className="text-3xl md:text-2xl font-semibold mb-4">
            Stay Updated
          </h2>
          <p className="text-1xl mb-8  opacity-50 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest startup insights delivered to your inbox.
          </p>
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

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Betawaves. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
             <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
