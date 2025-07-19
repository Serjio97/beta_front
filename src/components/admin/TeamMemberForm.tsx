
import { useEffect,useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin_url?: string; // ✅ use only this
}

interface TeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id'>) => void;
  member?: TeamMember;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ isOpen, onClose, onSubmit, member }) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    position: member?.position || '',
    bio: member?.bio || '',
    image: member?.image || '',
    linkedin_url: member?.linkedin_url  || ''
  });

 useEffect(() => {
  if (member) {
    setFormData({
      name: member.name || '',
      position: member.position || '',
      bio: member.bio || '',
      image: member.image || '',
      linkedin_url: member.linkedin_url || ''
    });
    setImagePreview(member.image || ''); // ✅ sync preview with image
  } else {
    setFormData({
      name: '',
      position: '',
      bio: '',
      image: '',
      linkedin_url: '',
    });
    setImagePreview(''); // ✅ reset preview
  }
}, [member, isOpen]);
  
    useEffect(() => {
  setImagePreview(formData.image);
}, [formData.image]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let imageUrl = formData.image;

  // If the user selected a File (not a URL string)
if (imageFile) {
  const form = new FormData();
  form.append('image', imageFile); // ✅ this is the File object

  try {
    const res = await fetch('http://betawaves_back:3100/api/uploads/team-image', {
  method: 'POST',
  body: form,
    });

    if (!res.ok) {
      const text = await res.text(); // helpful for debugging
      throw new Error(`Upload failed: ${text}`);
    }

    const data = await res.json(); // ✅ now this won't fail
    imageUrl = data.url;
  } catch (error) {
    console.error('Image upload failed:', error);
    return;
  }
}


  // Submit form with updated image URL
  onSubmit({
  name: formData.name,
  position: formData.position,
  bio: formData.bio,
  image: imageUrl,
  linkedin_url: formData.linkedin_url || null
  });

  onClose();
};


  const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string>(formData.image);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{member ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}

              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}

            />
          </div>
          <div className="space-y-2">
  <Label htmlFor="image">Upload Profile Image</Label>
  <Input
    id="image"
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }}
    required={!member} // required only when adding
  />
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="w-24 h-24 object-cover rounded-full border mt-2"
    />
  )}
</div>

          <div className="space-y-2">
            <Label htmlFor="linkedIn">LinkedIn URL (optional)</Label>
            <Input
              id="linkedIn"
              type="url"
              value={formData.linkedin_url}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {member ? 'Update Member' : 'Add Member'}
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

export default TeamMemberForm;
