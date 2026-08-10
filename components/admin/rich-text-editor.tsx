"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Undo, Redo, ImageIcon } from 'lucide-react';

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
