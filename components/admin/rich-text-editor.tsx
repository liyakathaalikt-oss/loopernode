"use client";

import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Underline } from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Undo, Redo, ImageIcon } from 'lucide-react';

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] }; },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

export function RichTextEditor({ 
  content, 
  onChange 
}: { 
  content: string; 
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextStyle,
      FontFamily,
      FontSize,
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-slate max-w-none min-h-[300px] p-4 focus:outline-none bg-white/5 border border-white/10 rounded-b-lg',
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('URL of the image (upload it in the Media Library first):');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-dark-900 border border-white/10 border-b-0 rounded-t-lg">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('bold') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('italic') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('underline') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('strike') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <select 
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-slate-300 focus:outline-none"
        >
          <option value="">Default Font</option>
          <option value="Inter, sans-serif">Inter</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Courier New, monospace">Courier New</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Times New Roman, serif">Times New Roman</option>
        </select>

        <select 
          onChange={(e) => {
            const size = e.target.value;
            if (size) (editor.chain().focus() as any).setFontSize(size).run();
            else (editor.chain().focus() as any).unsetFontSize().run();
          }}
          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-slate-300 focus:outline-none"
        >
          <option value="">Size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="30px">30px</option>
        </select>

        <div className="w-px h-6 bg-white/10 mx-1" />
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('bulletList') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('orderedList') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/10 transition-colors ${editor.isActive('blockquote') ? 'bg-primary-500/20 text-primary-400' : 'text-slate-300'}`}
          title="Quote"
        >
          <Quote size={18} />
        </button>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-white/10 transition-colors text-slate-300"
          title="Insert Image (from URL)"
        >
          <ImageIcon size={18} />
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-white/10 transition-colors text-slate-300 disabled:opacity-30"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-white/10 transition-colors text-slate-300 disabled:opacity-30"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
