import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Consulting } from '@/data/cmsData';



interface ConsultingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (consulting: Omit<Consulting, 'id'>) => void;
  consulting?: Consulting;
}

const ConsultingForm: React.FC<ConsultingFormProps> = ({ isOpen, onClose, onSubmit, consulting }) => {
  const [formData, setFormData] = useState({
    title: consulting?.title || '',
    description: consulting?.description || '',
    eligibility: consulting?.eligibility || '',
    features: consulting?.features.join('\n') || '',
    icon: consulting?.icon || 'home',
    category: consulting?.category || 'strategy',
    directUrl: consulting?.directUrl || ''
  });

  useEffect(() => {
    if (consulting) {
      setFormData({
        title: consulting.title,
        description: consulting.description,
        eligibility: consulting.eligibility,
        features: consulting.features.join('\n'),
        icon: consulting.icon,
        category: consulting.category,
        directUrl: consulting.directUrl || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        eligibility: '',
        features: '',
        icon: 'home',
        category: 'strategy',
        directUrl: ''
      });
    }
  }, [consulting, isOpen]);

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
          <DialogTitle>{consulting ? 'Edit Consulting' : 'Add New Consulting'}</DialogTitle>
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
                <option value="strategy">Strategy</option>
                <option value="program">Program</option>
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

          <div className="space-y-2">
            <Label htmlFor="eligibility">Duration</Label>
            <Input
              id="eligibility"
              value={formData.eligibility}
              onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
              
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="directUrl">Link Redirection URL</Label>
            <Input
              id="directUrl"
              value={formData.directUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, directUrl: e.target.value }))}
              placeholder="https://yourconsultinglink.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
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
              <option value="target">Target</option>
              <option value="lightbulb">Lightbulb</option>
              <option value="users">Users</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {consulting ? 'Update Consulting' : 'Add Consulting'}
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

export default ConsultingForm;
