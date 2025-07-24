
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Link as LucideLink } from 'lucide-react';
import { Link } from 'react-router-dom';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    program: '',
    message: ''
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [checkboxError, setCheckboxError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [captchaError, setCaptchaError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const siteKey = '6LcEaI0rAAAAAB9rhVBjMmUSFxoCb7aDgRn18vfu';

  useEffect(() => {
    // Load reCAPTCHA v3 script
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckboxError('');
    setCaptchaError('');
    setIsSubmitting(true);

    if (!agreePrivacy || !agreeTerms) {
      setCheckboxError('You must agree to the Privacy Policy and Terms of Service.');
      setIsSubmitting(false);
      return;
    }

    // reCAPTCHA v3: get token
    let captchaToken = '';
    if (window.grecaptcha) {
      captchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' });
    } else {
      setCaptchaError('reCAPTCHA failed to load. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // (Optional) You can keep or remove the company email pattern check
    // const companyEmailPattern = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|hotmail\.com$|outlook\.com$|icloud\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // if (!companyEmailPattern.test(formData.email)) {
    //   toast({
    //     title: 'Invalid Email',
    //     description: 'Please use your company email address (no Gmail, Yahoo, Outlook, etc.)',
    //     variant: 'destructive',
    //   });
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      const response = await fetch('https://betawaves-back.4bzwio.easypanel.host/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.program || formData.company || 'General Inquiry',
          message: formData.message,
          timestamp: new Date(),
          status: 'unread',
          recaptchaToken: captchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 48 hours.",
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        program: '',
        message: ''
      });
      setAgreePrivacy(false);
      setAgreeTerms(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission failed',
        description: (error as Error).message || 'There was a problem sending your message.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-blue-50 to-primary/5 py-20">
        <div className="container-width section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="block">Get In <span className="gradient-text">Touch</span></span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-4">
              Ready to transform your ideas into reality?
            </p>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Let's discuss how Betawaves can support you in your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-8 md:py-20">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-16">
           

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Our Locations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">UAE, Dubai</h4>
                      <p className="text-gray-600 text-sm">
                        Address: Level 1 Gate Avenue - South Zone, Dubai International Financial Centre, United Arab Emirates
                      </p>
                    </div>
                    <div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium">General Inquiries:</span>
                      <br />
                      <a href="mailto:hello@betawaves.io" className="text-primary hover:underline">
                        hello@betawaves.io
                      </a>
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>
                      <br />
                      <a className="text-primary hover:underline">
                        +971 58 829 0773
                      </a>
                    </div>
                    {/* <div>
                      <span className="font-medium">Program Applications:</span>
                      <br />
                      <a href="mailto:apply@betawaves.com" className="text-primary hover:underline">
                        apply@betawaves.com
                      </a>
                    </div>
                    <div>
                      <span className="font-medium">Partnership Opportunities:</span>
                      <br />
                      <a href="mailto:partners@betawaves.com" className="text-primary hover:underline">
                        partners@betawaves.com
                      </a>
                    </div> */}
                  </div>
                </Card>

               
              </div>

              {/* FAQ Section */}
           
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Company Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9._%+\-]+\.[a-zA-Z]{2,}$"
                          title="Please use your company email address (e.g., no Gmail, Yahoo, or Hotmail)"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="program">Interest *</Label>
                      <select
                        id="program"
                        name="program"
                        required
                        value={formData.program}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a program</option>
                        <option value="Products">Products</option>
                        <option value="Innovation Consulting">Innovation Consulting</option>
                        <option value="Investment">Investment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="mt-1"
                        placeholder="Tell us about your startup, your goals, and how we can help..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={agreePrivacy}
                          onChange={e => setAgreePrivacy(e.target.checked)}
                          required
                        />
                        I agree to the
                        <Link to="/privacy-policy" className="underline text-primary" target="_blank">Privacy Policy</Link>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={e => setAgreeTerms(e.target.checked)}
                          required
                        />
                        I agree to the
                        <Link to="/terms-of-service" className="underline text-primary" target="_blank">Terms of Service</Link>
                      </label>
                      {checkboxError && <div className="text-red-500 text-xs mt-1">{checkboxError}</div>}
                    </div>
                    {captchaError && <div className="text-red-500 text-xs mt-1">{captchaError}</div>}
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>


          </div>
        </div>
      </section>

      {/* Map Section */}
     
    </div>
  );
};

export default Contact;

declare global {
  interface Window {
    grecaptcha: any;
  }
}
