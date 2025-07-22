
import React, { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Collaborator {
  id?: string;
  name: string;
  logo: string;
  website: string;
}
export type StyleSettings = {
  heroType: 'image' | 'video';
  heroImage: string; // image path (if type is image)
  heroVideoUrl: string; // YouTube URL (if type is video)
  runningTextCompanies: string[];
  collaborators: Collaborator[];
};

interface StyleManagementFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (settings: StyleSettings) => void;
  currentSettings: StyleSettings;
}

const StyleManagementForm: React.FC<StyleManagementFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  currentSettings 
}) => {
const [formData, setFormData] = useState({
  heroType: currentSettings.heroType ?? 'image',
  heroImage: currentSettings.heroImage ?? '',
  heroVideoUrl: currentSettings.heroVideoUrl ?? '',
  companiesText: currentSettings.runningTextCompanies.join('\n'),
  collaborators: [] as Collaborator[]
});

useEffect(() => {
  if (isOpen) {
    fetch('http://localhost:3000/api/collaborators')
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({ ...prev, collaborators: data }));
      })
      .catch((err) => {
        console.error('Failed to load collaborators:', err);
      });
    fetch('http://localhost:3000/api/running-text')
      .then((res) => res.json())
      .then((companies) => {
        setFormData((prev) => ({
          ...prev,
          companiesText: companies.join('\n')
        }));
      });
    fetch('http://localhost:3000/api/style-settings')
  .then((res) => res.json())
  .then((data) => {
    setFormData((prev) => ({
      ...prev,
      heroType: data.hero_type,
      heroImage: data.hero_image,
      heroVideoUrl: data.hero_video_url,
      imagePreview: data.hero_image,
    }));
    setImagePreview(data.hero_image);
  });
  }
}, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  let heroImageUrl = formData.heroImage;

  // Upload hero image
  // if (imageFile) {
  //   const uploadForm = new FormData();
  //   uploadForm.append('image', imageFile);

  //   try {
  //     const res = await fetch('http://localhost:3000/api/uploads/style-hero-image', {
  //       method: 'POST',
  //       body: uploadForm
  //     });

  //     if (!res.ok) {
  //       const errorText = await res.text();
  //       throw new Error(`Upload failed: ${errorText}`);
  //     }

  //     const data = await res.json();
  //     heroImageUrl = data.url;
  //   } catch (err) {
  //     console.error('Hero image upload failed:', err);
  //     return;
  //   }
  // }
try {
  await fetch('http://localhost:3000/api/style-settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      heroType: formData.heroType,
      heroImage: heroImageUrl,
      heroVideoUrl: formData.heroVideoUrl,
    }),
  });
} catch (err) {
  console.error('Failed to update hero section settings:', err);
}
// Update running text companies
try {
  await fetch('http://localhost:3000/api/running-text', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companies: formData.companiesText
        .split('\n')
        .map((c) => c.trim())
        .filter((c) => c !== '')
    }),
  });
} catch (err) {
  console.error('Failed to update running text companies:', err);
}

  // Save collaborators
  for (const collab of formData.collaborators) {
    try {
      const endpoint = `http://localhost:3000/api/collaborators${collab.id ? `/${collab.id}` : ''}`;
      const method = collab.id ? 'PUT' : 'POST';


      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collab),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} collaborator`);
      }
    } catch (error) {
      console.error('Collaborator save error:', error);
    }
  }

  // Call parent form submit
  onSubmit({
    heroType: formData.heroType,
    heroImage: heroImageUrl,
    heroVideoUrl: formData.heroVideoUrl,
    runningTextCompanies: formData.companiesText
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c !== ''),
    collaborators: formData.collaborators,
  });

  onClose();
};

  const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string>(currentSettings.heroImage);

const updateCollaborator = (index: number, field: keyof Collaborator, value: string) => {
  setFormData(prev => {
    const updated = [...prev.collaborators];
    updated[index] = { ...updated[index], [field]: value };
    return { ...prev, collaborators: updated };
  });
};

const addCollaborator = () => {
  setFormData(prev => ({
    ...prev,
   collaborators: [...prev.collaborators, { name: '', logo: '', website: '' } as Collaborator]

  }));
};

const removeCollaborator = async (index: number) => {
  const toDelete = formData.collaborators[index];

  // If it exists in DB → delete from backend
  if (toDelete.id) {
    try {
      await fetch(`http://localhost:3000/api/collaborators/${toDelete.id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Failed to delete collaborator:', err);
    }
  }

  setFormData((prev) => {
    const updated = [...prev.collaborators];
    updated.splice(index, 1);
    return { ...prev, collaborators: updated };
  });
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Style Management</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
  <div>
  <Label>Hero Section Type</Label>
  <select
    value={formData.heroType}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, heroType: e.target.value as 'image' | 'video' }))
    }
    className="w-full mt-1 border border-input rounded px-3 py-2"
  >
    <option value="image">Image</option>
    <option value="video">YouTube Video</option>
  </select>
</div>

{formData.heroType === 'image' && (
  <div className="space-y-2">
    <Label htmlFor="heroImage">Hero Section Image URL</Label>
    <Input
      id="heroImage"
      type="url"
      value={formData.heroImage}
      onChange={e => {
        setFormData(prev => ({ ...prev, heroImage: e.target.value }));
        setImagePreview(e.target.value);
      }}
      placeholder="https://example.com/hero.jpg"
    />
    {imagePreview && (
      <img
        src={imagePreview}
        alt="Preview"
        className="w-full h-32 object-cover rounded-lg border mt-2"
      />
    )}
  </div>
)}

{formData.heroType === 'video' && (
  <div>
    <Label htmlFor="heroVideoUrl">YouTube Video URL</Label>
    <Input
      id="heroVideoUrl"
      type="url"
      value={formData.heroVideoUrl}
      onChange={(e) => setFormData((prev) => ({ ...prev, heroVideoUrl: e.target.value }))}
      placeholder="https://www.youtube.com/watch?v=..."
      required
    />
  </div>
)}

</div>

          
          <div className="space-y-2">
            <Label htmlFor="companies">Running Text Companies (one per line)</Label>
            <Textarea
              id="companies"
              value={formData.companiesText}
              onChange={(e) => setFormData(prev => ({ ...prev, companiesText: e.target.value }))}
              placeholder="Company Name 1&#10;Company Name 2&#10;Company Name 3"
              rows={4}
              required
            />
            <p className="text-sm text-gray-500">
              Enter each company/investor name on a new line. These will appear in the running text above the mission section.
            </p>
          </div>

          <div className="space-y-2">
  <Label>Collaborators</Label>
  {formData.collaborators.map((collab, idx) => (
    <div key={idx} className="flex flex-col md:flex-row gap-2 mb-4 border p-3 rounded-md">
      <Input
        placeholder="Name"
        value={collab.name}
        onChange={(e) => updateCollaborator(idx, 'name', e.target.value)}
      />
      <Input
        placeholder="Logo URL"
        value={collab.logo}
        onChange={(e) => updateCollaborator(idx, 'logo', e.target.value)}
      />
      <Input
        placeholder="Website URL"
        value={collab.website}
        onChange={(e) => updateCollaborator(idx, 'website', e.target.value)}
      />
      <Button
        type="button"
        variant="destructive"
        onClick={() => removeCollaborator(idx)}
      >
        Remove
      </Button>
    </div>
  ))}
  <Button type="button" variant="outline" onClick={addCollaborator}>
    Add Collaborator
  </Button>
</div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Update Style Settings
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

export default StyleManagementForm;
