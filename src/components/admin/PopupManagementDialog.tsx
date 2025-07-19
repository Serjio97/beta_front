import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CMSService, Popup } from '@/data/cmsData';

interface PopupManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopupManagementDialog = ({ open, onOpenChange }: PopupManagementDialogProps) => {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [formData, setFormData] = useState<{
  title: string;
  subject: string;
  description: string;
  image: File | string;
  link: string;
  isActive: boolean;
}>({
  title: '',
  subject: '',
  description: '',
  image: '',
  link: '',
  isActive: true
});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchPopup();
    }
  }, [open]);

  const fetchPopup = async () => {
    try {
      const popupData = await CMSService.getPopup();
      if (popupData) {
        setPopup(popupData);
        setFormData({
          title: popupData.title,
          subject: popupData.subject,
          description: popupData.description,
          image: popupData.image,
          link: popupData.link,
          isActive: popupData.isActive
        });
      }
    } catch (error) {
      console.error('Error fetching popup:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const form = new FormData();
    form.append('title', formData.title || '');
    form.append('subject', formData.subject || '');
    form.append('description', formData.description || '');
    form.append('link', formData.link || '');
    form.append('isActive', String(formData.isActive));

    // 👇 handle file or fallback to existing image
    if (formData.image instanceof File) {
      form.append('image', formData.image);
    } else if (typeof formData.image === 'string') {
      form.append('existingImage', formData.image); // required by backend
    }

    await fetch('http://localhost:3000/api/popup/update', {
      method: 'POST',
      body: form,
    });

    onOpenChange(false);
  } catch (err) {
    console.error('Popup update failed', err);
  } finally {
    setLoading(false);
  }
};



  const handleChange = (field: keyof typeof formData, value: string | boolean | File) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Welcome Popup</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter popup title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Enter popup subject"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter popup description"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
           <Label htmlFor="image">Image</Label>
<Input
  id="image"
  type="file"
  accept="image/*"
  onChange={(e) => handleChange('image', e.target.files?.[0] || '')}
/>
{typeof formData.image === 'string' && formData.image && (
  <img
    src={formData.image}
    alt="Popup preview"
    className="w-full h-40 object-cover rounded-md"
  />
)}


          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link (Get Started Button)</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => handleChange('link', e.target.value)}
              placeholder="Enter destination URL"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleChange('isActive', checked)}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : 'Save Popup'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PopupManagementDialog;