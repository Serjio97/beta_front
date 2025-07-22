import React, { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Type,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

interface EmailEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export const EmailEditor: React.FC<EmailEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your message here...",
  minHeight = "200px"
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Apply formatting commands
  const formatDoc = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    updateContent();
  };
  
  // Update content after changes
  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Colors from common email editors
  const textColors = [
    { label: 'Black', value: '#000000' },
    { label: 'Dark Gray', value: '#444444' },
    { label: 'Gray', value: '#888888' },
    { label: 'Red', value: '#ff0000' },
    { label: 'Orange', value: '#ff9900' },
    { label: 'Yellow', value: '#ffff00' },
    { label: 'Green', value: '#00ff00' },
    { label: 'Cyan', value: '#00ffff' },
    { label: 'Blue', value: '#0000ff' },
    { label: 'Purple', value: '#9900ff' },
    { label: 'White', value: '#ffffff' },
  ];

  // Font sizes from common email editors
  const fontSizes = [
    { label: 'Small', value: '1' },
    { label: 'Normal', value: '3' },
    { label: 'Large', value: '5' },
    { label: 'Extra Large', value: '7' },
  ];

  // Common email emoji set
  const emojis = ['😊', '👍', '🎉', '❤️', '👏', '🙏', '😂', '🤔', '🔥', '✅', '⭐', '📧', '📝'];

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Email-like toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
        {/* Basic formatting */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('underline')}
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <span className="mx-1 text-gray-300">|</span>

        {/* Text alignment */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('justifyRight')}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <span className="mx-1 text-gray-300">|</span>
        
        {/* Lists */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('insertUnorderedList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => formatDoc('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <span className="mx-1 text-gray-300">|</span>
        
        {/* Link */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => {
            const url = prompt('Enter link URL:');
            if (url) formatDoc('createLink', url);
          }}
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </Button>
        
        {/* Image */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) formatDoc('insertImage', url);
          }}
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Button>

        <span className="mx-1 text-gray-300">|</span>
        
        {/* Font size */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Font Size"
            >
              <Type className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="flex flex-col gap-1">
              {fontSizes.map(size => (
                <Button 
                  key={size.value}
                  variant="ghost" 
                  size="sm"
                  className="justify-start"
                  onClick={() => formatDoc('fontSize', size.value)}
                >
                  <span style={{ fontSize: `${parseInt(size.value) * 0.25}rem` }}>{size.label}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Text color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Text Color"
            >
              <div className="h-4 w-4 rounded-full border border-gray-300" style={{ background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)' }} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="grid grid-cols-6 gap-1">
              {textColors.map(color => (
                <Button 
                  key={color.value}
                  variant="ghost" 
                  size="sm"
                  className="h-6 w-6 p-0 rounded-md"
                  style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #e5e7eb' : 'none' }}
                  onClick={() => formatDoc('foreColor', color.value)}
                  title={color.label}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Emojis */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Emoji"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="grid grid-cols-5 gap-1">
              {emojis.map(emoji => (
                <Button 
                  key={emoji}
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection?.rangeCount) {
                      selection.getRangeAt(0).insertNode(document.createTextNode(emoji));
                      updateContent();
                    }
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 focus:outline-none"
        style={{ minHeight }}
        onInput={updateContent}
        onBlur={updateContent}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};