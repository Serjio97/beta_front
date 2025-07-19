
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Resource } from '@/data/cmsData';

interface ResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Resource, 'id'>) => void;
  resource?: Resource;
}

const ResourceForm = ({ isOpen, onClose, onSubmit, resource }: ResourceFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'guide' as Resource['type'],
    category: '',
    downloadUrl: '',
    image: '',
    tags: ''
  });

  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        category: resource.category,
        downloadUrl: resource.downloadUrl,
        image: resource.image,
        tags: resource.tags.join(', '),
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'guide',
        category: '',
        downloadUrl: '',
        image: '',
        tags: ''
      });
    }
  }, [resource, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     const formattedTags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    onSubmit({
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      downloadUrl: formData.downloadUrl,
      image: formData.image,
      tags: formattedTags
    });
    onClose();
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{resource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as Resource['type'] }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pitch-deck">Pitch Deck</SelectItem>
                  <SelectItem value="financial-model">Financial Model</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="downloadUrl">Link Redirection URL</Label>
              <Input
                id="downloadUrl"
                value={formData.downloadUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, downloadUrl: e.target.value }))}
                placeholder="https://www.hubspot.fr/"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="e.g., startup, tech, innovation"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit">{resource ? 'Update' : 'Add'} Resource</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceForm;
