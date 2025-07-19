
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CaseStudy } from '@/data/cmsData';

interface CaseStudyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CaseStudy, 'id'>) => void;
  caseStudy?: CaseStudy;
}

const CaseStudyForm = ({ isOpen, onClose, onSubmit, caseStudy }: CaseStudyFormProps) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    tags: '',
    image: '',
    testimonial: {
      quote: '',
      author: '',
      position: ''
    }
  });

  useEffect(() => {
    if (caseStudy) {
      setFormData({
        companyName: caseStudy.companyName,
        industry: caseStudy.industry,
        description: caseStudy.description,
        challenge: caseStudy.challenge,
        solution: caseStudy.solution,
        results: caseStudy.results.join('\n'),
tags: caseStudy.tags.join(', '),

        image: caseStudy.image,
        testimonial: caseStudy.testimonial
      });
    } else {
      setFormData({
        companyName: '',
        industry: '',
        description: '',
        challenge: '',
        solution: '',
        results: '',
        tags: '',
        image: '',
        testimonial: {
          quote: '',
          author: '',
          position: ''
        }
      });
    }
  }, [caseStudy, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let imageUrl = formData.image;

  if (imageFile) {
    const form = new FormData();
    form.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:3000/api/uploads/case-study-image', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upload failed: ${text}`);
      }

      const data = await res.json();
      imageUrl = data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return;
    }
  }

  const formattedResults = formData.results
    .split('\n')
    .map(line => line.trim())
    .filter(line => line);

  const formattedTags = formData.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag);

  onSubmit({
    ...formData,
    image: imageUrl,
    results: formattedResults,
    tags: formattedTags,
  });

  onClose();
};


const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string>(formData.image);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{caseStudy ? 'Edit Case Study' : 'Add New Case Study'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              required
            />
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
          
          <div>
            <Label htmlFor="challenge">Challenge</Label>
            <Textarea
              id="challenge"
              value={formData.challenge}
              onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="solution">Solution</Label>
            <Textarea
              id="solution"
              value={formData.solution}
              onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="results">Results (one per line)</Label>
             <Textarea
              id="results"
              value={formData.results}
              onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
              placeholder="Enter each result on a new line"
              rows={4}
              required
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
          
         <div>
  <Label htmlFor="image">Upload Image</Label>
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
    required={!caseStudy}
  />
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="w-24 h-24 object-cover rounded border mt-2"
    />
  )}
</div>


          <div className="space-y-2">
            <Label>Testimonial</Label>
            <div className="space-y-2 border p-4 rounded">
              <div>
                <Label htmlFor="testimonialQuote">Quote</Label>
                <Textarea
                  id="testimonialQuote"
                  value={formData.testimonial.quote}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    testimonial: { ...prev.testimonial, quote: e.target.value }
                  }))}
                  placeholder="Enter testimonial quote"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="testimonialAuthor">Author</Label>
                  <Input
                    id="testimonialAuthor"
                    value={formData.testimonial.author}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      testimonial: { ...prev.testimonial, author: e.target.value }
                    }))}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label htmlFor="testimonialPosition">Position</Label>
                  <Input
                    id="testimonialPosition"
                    value={formData.testimonial.position}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      testimonial: { ...prev.testimonial, position: e.target.value }
                    }))}
                    placeholder="Author position"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit">{caseStudy ? 'Update' : 'Add'} Case Study</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyForm;
