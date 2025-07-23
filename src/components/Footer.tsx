
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    // Simple email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
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

            <br></br>
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

          {/* Newsletter */}
        <div className="container-width section-padding text-center">
          <h2 className="text-xs font-semibold mb-1">Stay Updated</h2>
          <p className="text-xs mb-2 opacity-60 max-w-[180px] mx-auto">
            Get the latest insights.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-1 max-w-[220px] mx-auto items-center justify-center">
            <input
              type="email"
              placeholder="Email"
              className="px-1 py-1 rounded-sm text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-auto flex-1 h-7"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              required
              style={{ minWidth: 0 }}
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-primary px-2 py-1 rounded-sm text-xs font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto h-7"
              style={{ minWidth: 60 }}
            >
              {submitting ? '...' : 'Subscribe'}
            </button>
          </form>

          {emailError && <p className="text-red-400 mt-1 text-xs">{emailError}</p>}
          {success && <p className="text-green-400 mt-1 text-xs">Subscribed!</p>}
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
