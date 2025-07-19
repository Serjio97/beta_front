
import { useEffect,useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Service } from '@/data/cmsData';

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: Omit<Service, 'id'>) => void;
  service?: Service;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ isOpen, onClose, onSubmit, service }) => {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    duration: service?.duration || '',
    eligibility: service?.eligibility || '',
    features: service?.features.join('\n') || '',
    icon: service?.icon || 'home',
    category: service?.category || 'incubation',
    presentationUrl: service?.presentationUrl || ''
  });
  // 🛠 Sync formData when editing an existing service
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        duration: service.duration || '',
        eligibility: service.eligibility || '',
        features: Array.isArray(service.features) ? service.features.join('\n') : '',
        icon: service.icon || 'home',
        category: service.category || 'incubation',
        presentationUrl: service.presentationUrl || ''
      });
    } else {
      // Reset form when adding new
      setFormData({
        title: '',
        description: '',
        duration: '',
        eligibility: '',
        features: '',
        icon: 'home',
        category: 'incubation',
        presentationUrl: ''
      });
    }
  }, [service, isOpen]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim() !== '')
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Program' : 'Add New Program'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="incubation">Incubation</option>
                <option value="acceleration">Acceleration</option>
                <option value="mentorship">Mentorship</option>
                <option value="funding">Funding</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eligibility">Eligibility</Label>
              <Input
                id="eligibility"
                value={formData.eligibility}
                onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentationUrl">Link Redirection URL</Label>
            <Input
              id="presentationUrl"
              value={formData.presentationUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, presentationUrl: e.target.value }))}
              placeholder="https://www.hubspot.fr"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              placeholder="Enter each feature on a new line"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="home">Home</option>
              <option value="arrow-up">Arrow Up</option>
              <option value="book">Book</option>
              <option value="users">Users</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {service ? 'Update Program' : 'Add Program'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
