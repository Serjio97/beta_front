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
  Link as LinkIcon,
  Image as ImageIcon,
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
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    
    if (command === 'fontSize') {
      const span = document.createElement('span');
      span.style.fontSize = getFontSizeValue(value);
      
      if (range.collapsed) {
        // No selection, just set up for future typing
        span.innerHTML = '\u200b'; // Zero-width space
        range.insertNode(span);
        range.setStart(span, 0);
        range.setEnd(span, 1);
      } else {
        try {
          range.surroundContents(span);
        } catch (e) {
          // Fallback for complex selections
          const contents = range.extractContents();
          span.appendChild(contents);
          range.insertNode(span);
        }
      }
    } else if (command === 'foreColor') {
      const span = document.createElement('span');
      span.style.color = value;
      
      if (range.collapsed) {
        span.innerHTML = '\u200b'; // Zero-width space
        range.insertNode(span);
        range.setStart(span, 0);
        range.setEnd(span, 1);
      } else {
        try {
          range.surroundContents(span);
        } catch (e) {
          const contents = range.extractContents();
          span.appendChild(contents);
          range.insertNode(span);
        }
      }
    } else {
      // Use execCommand for basic formatting
      document.execCommand(command, false, value);
    }
    
    selection.removeAllRanges();
    selection.addRange(range);
    
    setTimeout(() => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }, 10);
  };
  
  const getFontSizeValue = (size: string) => {
    const sizeMap: Record<string, string> = {
      '1': '10px',
      '2': '13px', 
      '3': '16px',
      '4': '18px',
      '5': '24px',
      '6': '32px',
      '7': '48px'
    };
    return sizeMap[size] || '16px';
  };
  
  // Update content after changes while preserving cursor position
  const updateContent = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      const startOffset = range?.startOffset;
      const endOffset = range?.endOffset;
      const startContainer = range?.startContainer;
      const endContainer = range?.endContainer;
      
      onChange(editorRef.current.innerHTML);
      
      // Restore cursor position if we have a valid selection
      if (selection && range && startContainer && endContainer) {
        try {
          const newRange = document.createRange();
          newRange.setStart(startContainer, startOffset || 0);
          newRange.setEnd(endContainer, endOffset || 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } catch (e) {
          // Fallback: place cursor at end of content
          const newRange = document.createRange();
          newRange.selectNodeContents(editorRef.current);
          newRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
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
    <div className="border rounded-lg shadow-sm overflow-hidden bg-card">
      {/* Email-like toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2.5 border-b bg-muted/50">
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

        <span className="mx-1.5 text-muted-foreground/30">|</span>

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

        <span className="mx-1.5 text-muted-foreground/30">|</span>
        
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

        <span className="mx-1.5 text-muted-foreground/30">|</span>
        
        {/* Link */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) formatDoc("createLink", url);
          }}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        
        {/* Image */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) formatDoc("insertImage", url);
          }}
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <span className="mx-1.5 text-muted-foreground/30">|</span>
        
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
          <PopoverContent className="w-auto p-2 bg-background border shadow-md z-50">
            <div className="flex flex-col gap-1">
              {fontSizes.map(size => (
                <Button 
                  key={size.value}
                  variant="ghost" 
                  size="sm"
                  className="justify-start hover:bg-accent"
                  onClick={() => {
                    formatDoc('fontSize', size.value);
                  }}
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
              <div className="h-4 w-4 rounded-full border border-border" style={{ background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)' }} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 bg-background border shadow-md z-50">
            <div className="grid grid-cols-6 gap-1">
              {textColors.map(color => (
                <Button 
                  key={color.value}
                  variant="ghost" 
                  size="sm"
                  className="h-6 w-6 p-0 rounded-md hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #e5e7eb' : 'none' }}
                  onClick={() => {
                    formatDoc('foreColor', color.value);
                  }}
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
          <PopoverContent className="w-auto p-2 bg-background border shadow-md z-50">
            <div className="grid grid-cols-5 gap-1">
              {emojis.map(emoji => (
                <Button 
                  key={emoji}
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent text-lg"
                  onClick={() => {
                    if (editorRef.current) {
                      editorRef.current.focus();
                      
                      // Insert emoji at current cursor position
                      const selection = window.getSelection();
                      if (selection && selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const emojiNode = document.createTextNode(emoji);
                        range.insertNode(emojiNode);
                        
                        // Move cursor after the emoji
                        range.setStartAfter(emojiNode);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                      } else {
                        // If no selection, append to end
                        editorRef.current.appendChild(document.createTextNode(emoji));
                      }
                      
                      // Update content
                      onChange(editorRef.current.innerHTML);
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
        className="p-6 focus:outline-none prose prose-sm max-w-none"
        style={{ minHeight, fontSize: '15px', lineHeight: '1.6' }}
        onInput={(e) => {
          // Only update content, don't mess with cursor during typing
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
          }
        }}
        onBlur={updateContent}
        onFocus={(e) => {
          // Only set initial cursor if editor is truly empty
          if (!e.currentTarget.innerHTML || e.currentTarget.innerHTML === `<p>${placeholder}</p>`) {
            e.currentTarget.innerHTML = '<p><br></p>';
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(e.currentTarget.firstChild?.firstChild || e.currentTarget, 0);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }}
        onKeyDown={(e) => {
          // Handle Enter key to create new paragraphs
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br><br>');
          }
        }}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}; 