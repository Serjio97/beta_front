import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { Service } from '@/data/cmsData';

interface ProgramApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  program: Service | null;
}

const ProgramApplicationForm = ({ isOpen, onClose, program }: ProgramApplicationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
   const response = await fetch('https://betawaves-back.4bzwio.easypanel.host/api/program-applications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    program_id: program?.id,
    founder_name: formData.name,
    company_name: formData.company,
    email: formData.email,
    phone: formData.phone,
    company_description: formData.message,
    submitted_at: new Date(),
    status: 'pending'
  }),
});


    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    setIsSubmitted(true);
    toast({
      title: "Application submitted",
      description: "Thank you for your application! You can now download the program presentation.",
    });

  } catch (err) {
    console.error('Submission error:', err);
    toast({
      title: "Submission failed",
      description: "Something went wrong while submitting the application.",
      variant: "destructive",
    });
  }
};

  const handleDownload = () => {
    // Use the presentation URL from the program if available
    const downloadUrl = program?.presentationUrl || `/presentations/${program?.id}-presentation.pdf`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${program?.title}-Presentation.pdf`;
    link.click();
    
    toast({
      title: "Download started",
      description: "The program presentation is being downloaded.",
    });
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    });
    setIsSubmitted(false);
    onClose();
  };

  if (!program) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? 'Application Submitted!' : `Apply for ${program.title}`}
          </DialogTitle>
        </DialogHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company/Startup Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="message">Tell us about your startup *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Brief description of your startup, stage, and what you hope to achieve..."
                rows={4}
                required
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Submit Application
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 mb-4">
                Thank you for applying to {program.title}! We've received your application and will review it shortly.
              </p>
              <p className="text-sm text-green-600 mb-4">
                As promised, you can now download the detailed program presentation with all the information you need.
              </p>
            </div>
            
            <Button onClick={handleDownload} className="w-full flex items-center gap-2">
              <Download size={16} />
              Download Program Presentation
            </Button>
            
            <Button variant="outline" onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProgramApplicationForm;
