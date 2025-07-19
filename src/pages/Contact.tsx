
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    program: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://betawaves_back:3100/api/contact-messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    subject: formData.program || formData.company || 'General Inquiry',
    message: formData.message,
    timestamp: new Date(),
    status: 'unread'
  }),
});

    if (!response.ok) throw new Error('Failed to send message');

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      program: '',
      message: ''
    });
  } catch (error) {
    console.error('Submission error:', error);
    toast({
      title: 'Submission failed',
      description: 'There was a problem sending your message.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-50 py-20">
        <div className="container-width section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to transform your startup idea into reality? Let's discuss how Betawaves can support your entrepreneurial journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20"> 
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Office Locations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Level 1 Gate Avenue</h4>
                      <p className="text-gray-600 text-sm">
                        South Zone, Dubai International Financial Centre<br />
                        United Arab Emirates<br />
                        +971 58 829 0773
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
                      <a href="mailto:hello@betawaves.com" className="text-primary hover:underline">
                        hello@betawaves.com
                      </a>
                    </div>
                    <div>
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
                    </div>
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
                    Fill out the form below and we'll get back to you within 24 hours.
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
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company/Startup Name</Label>
                      <Input 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="program">Interest</Label>
                      <select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a program</option>
                        <option value="incubation">Products</option>
                        <option value="acceleration">Consulting</option>
                        <option value="bootcamp">Investment</option>
                        <option value="cxo-academy">Programs</option>
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
