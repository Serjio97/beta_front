import React, { useState, useEffect, Suspense } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BlogPost } from '@/data/cmsData';

const ReactQuill = require('react-quill');

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

  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    // Dynamically load Quill's CSS only on client
    import('react-quill/dist/quill.snow.css');
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      image: formData.image
    });

    onClose();
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ]
  };

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
            <div className="bg-white border rounded">
              <Suspense fallback={<div>Loading editor...</div>}>
                <ReactQuill
                  theme="snow"
                  value={formData.excerpt}
                  onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, excerpt: value }))
                  }
                  style={{ minHeight: 100 }}
                  modules={quillModules}
                />
              </Suspense>
            </div>
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <div className="bg-white border rounded">
              <Suspense fallback={<div>Loading editor...</div>}>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, content: value }))
                  }
                  style={{ minHeight: 200 }}
                  modules={quillModules}
                />
              </Suspense>
            </div>
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
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={e => {
                setFormData(prev => ({ ...prev, image: e.target.value }));
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
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
