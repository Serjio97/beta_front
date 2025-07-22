import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost } from '@/data/cmsData';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

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

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
            {/* Toolbar */}
            {editor && (
              <div className="flex flex-wrap gap-2 mb-2">
                <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-200' : ''}>
                  Bold
                </Button>
                <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-200' : ''}>
                  Italic
                </Button>
                <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-200' : ''}>
                  Underline
                </Button>
                <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}>
                  Bullet List
                </Button>
                <Button type="button" variant="outline" onClick={() => editor.chain().focus().setColor('#F87171').run()}>
                  Red
                </Button>
              </div>
            )}
            {/* Editor */}
            <div className="border rounded p-2 min-h-[200px]">
              <EditorContent editor={editor} />
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
