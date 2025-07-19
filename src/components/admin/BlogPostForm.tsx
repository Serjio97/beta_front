
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BlogPost } from '@/data/cmsData';

interface BlogPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<BlogPost, 'id'>) => void;
  blogPost?: BlogPost;
}

const BlogPostForm = ({ isOpen, onClose, onSubmit, blogPost }: BlogPostFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    publishDate: '',
    tags: '',
    image: ''
  });

  useEffect(() => {
    if (blogPost) {
      setFormData({
        title: blogPost.title,
        excerpt: blogPost.excerpt,
        content: blogPost.content,
        author: blogPost.author,
        category: blogPost.category,
        publishDate: blogPost.publishDate,
        tags: blogPost.tags.join(', '),
        image: blogPost.image
      });
      setImagePreview(blogPost.image); 
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        publishDate: '',
        tags: '',
        image: ''
      });
    }
  }, [blogPost, isOpen]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  let imageUrl = formData.image;

  if (imageFile) {
    const form = new FormData();
    form.append('image', imageFile);

    try {
      const res = await fetch('https://betawaves-back.4bzwio.easypanel.host/api/uploads/blog-image', {
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

  const formattedTags = formData.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag);

  onSubmit({
    title: formData.title,
    excerpt: formData.excerpt,
    content: formData.content,
    author: formData.author,
    category: formData.category,
    publishDate: formData.publishDate,
    tags: formattedTags,
    image: imageUrl
  });

  onClose();
};

const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string>('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blogPost ? 'Edit Blog Post' : 'Add New Blog Post'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
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
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input
              id="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
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
    required={!blogPost}
  />
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="w-24 h-24 object-cover rounded border mt-2"
    />
  )}
</div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit">{blogPost ? 'Update' : 'Add'} Blog Post</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostForm;
