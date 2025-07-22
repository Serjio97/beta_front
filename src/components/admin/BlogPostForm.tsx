
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogPost } from '@/data/cmsData';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaLink, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaFont, FaPalette } from 'react-icons/fa';
import { MdFormatColorText } from 'react-icons/md';

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Color,
      TextStyle,
      FontSize,
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'min-h-[200px] border rounded p-2 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && blogPost) {
      editor.commands.setContent(blogPost.content || '');
    }
    if (editor && !blogPost) {
      editor.commands.setContent('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogPost, isOpen, editor]);

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
            {/* Tiptap Toolbar */}
            <div className="flex flex-wrap gap-2 mb-2 items-center">
              <button type="button" title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editor} className={editor?.isActive('bold') ? 'text-blue-600' : ''}><FaBold /></button>
              <button type="button" title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editor} className={editor?.isActive('italic') ? 'text-blue-600' : ''}><FaItalic /></button>
              <button type="button" title="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()} disabled={!editor} className={editor?.isActive('underline') ? 'text-blue-600' : ''}><FaUnderline /></button>
              <button type="button" title="Strikethrough" onClick={() => editor?.chain().focus().toggleStrike().run()} disabled={!editor} className={editor?.isActive('strike') ? 'text-blue-600' : ''}><FaStrikethrough /></button>
              <button type="button" title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={!editor} className={editor?.isActive('bulletList') ? 'text-blue-600' : ''}><FaListUl /></button>
              <button type="button" title="Ordered List" onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={!editor} className={editor?.isActive('orderedList') ? 'text-blue-600' : ''}><FaListOl /></button>
              <button type="button" title="Link" onClick={() => {
                const url = window.prompt('Enter URL');
                if (url) editor?.chain().focus().setLink({ href: url }).run();
              }} disabled={!editor}><FaLink /></button>
              <button type="button" title="Font Size 16" onClick={() => editor?.chain().focus().setFontSize('16px').run()} disabled={!editor}><FaFont /><span className="text-xs ml-1">16</span></button>
              <button type="button" title="Font Size 20" onClick={() => editor?.chain().focus().setFontSize('20px').run()} disabled={!editor}><FaFont /><span className="text-xs ml-1">20</span></button>
              <button type="button" title="Text Red" onClick={() => editor?.chain().focus().setColor('#F87171').run()} disabled={!editor}><MdFormatColorText className="text-red-500" /></button>
              <button type="button" title="Text Blue" onClick={() => editor?.chain().focus().setColor('#2563EB').run()} disabled={!editor}><MdFormatColorText className="text-blue-500" /></button>
              <button type="button" title="Text Green" onClick={() => editor?.chain().focus().setColor('#16A34A').run()} disabled={!editor}><MdFormatColorText className="text-green-500" /></button>
              <button type="button" title="Reset Color" onClick={() => editor?.chain().focus().unsetColor().run()} disabled={!editor}><FaPalette /></button>
              <button type="button" title="Align Left" onClick={() => editor?.chain().focus().setTextAlign('left').run()} disabled={!editor}><FaAlignLeft /></button>
              <button type="button" title="Align Center" onClick={() => editor?.chain().focus().setTextAlign('center').run()} disabled={!editor}><FaAlignCenter /></button>
              <button type="button" title="Align Right" onClick={() => editor?.chain().focus().setTextAlign('right').run()} disabled={!editor}><FaAlignRight /></button>
              <button type="button" title="Align Justify" onClick={() => editor?.chain().focus().setTextAlign('justify').run()} disabled={!editor}><FaAlignJustify /></button>
              <button type="button" title="Undo" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor}><FaUndo /></button>
              <button type="button" title="Redo" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor}><FaRedo /></button>
            </div>
            <EditorContent editor={editor} />
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
