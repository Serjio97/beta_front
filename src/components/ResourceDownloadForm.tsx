
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { Resource } from '@/data/cmsData';

interface ResourceDownloadFormProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
}

const ResourceDownloadForm = ({ isOpen, onClose, resource }: ResourceDownloadFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Download request submitted:', { ...formData, resourceId: resource?.id });
    
    setIsSubmitted(true);
    toast({
      title: "Information submitted",
      description: "Thank you for your information! You can now download the resource.",
    });
  };

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = resource?.downloadUrl || '#';
    link.download = `${resource?.title}.pdf`;
    link.click();
    
    toast({
      title: "Download started",
      description: "The resource is being downloaded.",
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

  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? 'Download Ready!' : `Download ${resource.title}`}
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
              <Label htmlFor="company">Company/Organization *</Label>
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
              <Label htmlFor="message">How will you use this resource? *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Brief description of your intended use..."
                rows={3}
                required
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Submit & Download
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
                Thank you for providing your information! Your download is ready.
              </p>
              <p className="text-sm text-green-600 mb-4">
                Click the button below to download {resource.title}.
              </p>
            </div>
            
            <Button onClick={handleDownload} className="w-full flex items-center gap-2">
              <Download size={16} />
              Download {resource.title}
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

export default ResourceDownloadForm;
