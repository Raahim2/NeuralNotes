"use client";
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import YouTube from '@tiptap/extension-youtube';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import { initFlowbite } from 'flowbite';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu'; 

import { createLowlight, all } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import 'highlight.js/styles/atom-one-dark.css';

import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';

// Tool Imports
import CoreTools from './(Core)/CoreTools';
import StructureTools from './(Structure)/StructureTools';
import TextTools from './(Text)/TextTools';
import AlignTools from './(Alignment)/AlignmentTools';
import MediaTools from './(Media)/MediaTools';
import ConvertTools from './(Convert)/ConvertTools';
import HistoryTools from './(History)/HistoryTools';
import TableTools from './(Table)/TableTools';
import AITool from './(AI)/AITool'; 

// 1. Better Visual Starter Content
const starterContent = `
  <h1>Welcome to NeuralNotes 🧠</h1>
  <p>This is your new <b>AI-powered</b> block editor. It's designed to help you think, write, and organize better.</p>
  
  <h2>What can this editor do?</h2>
  <p>You can format text in <span style="color: #7E3AF2">various colors</span>, <mark>highlight important details</mark>, or use <code>code blocks</code> for technical notes.</p>
  
  <h3>AI Capabilities ✨</h3>
  <p>Select any text and click the <b>AI tab</b> to rewrite, shorten, or expand your thoughts instantly.</p>

  <h3>Structured Data</h3>
  <table style="width:100%">
    <tbody>
      <tr>
        <th colspan="1" rowspan="1"><p>Feature</p></th>
        <th colspan="1" rowspan="1"><p>Status</p></th>
        <th colspan="1" rowspan="1"><p>Notes</p></th>
      </tr>
      <tr>
        <td colspan="1" rowspan="1"><p>Rich Text</p></td>
        <td colspan="1" rowspan="1"><p>✅ Ready</p></td>
        <td colspan="1" rowspan="1"><p>Bold, Italic, Underline</p></td>
      </tr>
      <tr>
        <td colspan="1" rowspan="1"><p>Media</p></td>
        <td colspan="1" rowspan="1"><p>✅ Ready</p></td>
        <td colspan="1" rowspan="1"><p>Images & YouTube support</p></td>
      </tr>
    </tbody>
  </table>

  <blockquote>
    "The secret of getting ahead is getting started." - Mark Twain
  </blockquote>

  <pre><code class="language-javascript">console.log('NeuralNotes is ready!');</code></pre>
`;

const FontSizeTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});

const lowlight = createLowlight(all);

const TiptapEditor = () => {
  // State for the Tabbed Toolbar
  const [activeTab, setActiveTab] = useState('text'); // 'ai', 'text', 'structure', 'media', 'table', 'history'

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'jsx' }),
      Color,
      FontSizeTextStyle,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      YouTube,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      BubbleMenuExtension.configure({
        pluginKey: 'bubbleMenu',
      }),
    ],
    content: starterContent,
    editorProps: {
      attributes: {
        // 3. FORCE BLACK TEXT: 
        // We add 'text-black' and 'prose-p:text-black' to override the default gray formatting
        class: 'format lg:format-lg dark:format-invert focus:outline-none max-w-none text-black dark:text-gray-100 [&_p]:text-black dark:[&_p]:text-gray-100 [&_h1]:text-black dark:[&_h1]:text-white [&_h2]:text-black dark:[&_h2]:text-white [&_h3]:text-black dark:[&_h3]:text-white',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      initFlowbite();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  // --- Toolbar Tab Button Component ---
  const TabButton = ({ id, label, icon, active }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
        active 
          ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="w-full border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden">
      
      {/* 2. Organized Toolbar Area */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
        
        {/* ROW 1: Categories / Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-700">
          <TabButton 
            id="text" 
            active={activeTab === 'text'} 
            label="Text" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            } 
          />
           <TabButton 
            id="structure" 
            active={activeTab === 'structure'} 
            label="Headings" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            } 
          />
          <TabButton 
            id="ai" 
            active={activeTab === 'ai'} 
            label="AI Magic" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            } 
          />
          <TabButton 
            id="media" 
            active={activeTab === 'media'} 
            label="Media" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            } 
          />
           <TabButton 
            id="table" 
            active={activeTab === 'table'} 
            label="Table" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7-8v8m14-8v8M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            } 
          />
           <TabButton 
            id="history" 
            active={activeTab === 'history'} 
            label="History" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            } 
          />
        </div>

        {/* ROW 2: The Specific Tools for the selected tab */}
        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 min-h-[48px] flex items-center flex-wrap gap-2 transition-all">
          
          {/* Always Visible Essentials (Undo/Redo) can optionally be here, or inside History. 
              Let's put CoreTools here always for convenience? 
              User asked for tabs, let's stick to strict tabs to reduce clutter, 
              but Undo/Redo is usually global. I'll include CoreTools in 'history' tab OR 'structure' tab.
              Actually, let's keep CoreTools always visible on the far right or left? 
              Let's put them in 'Structure' or make them Global. 
              DECISION: Let's put CoreTools in the specific tabs to keep it clean.
          */}

          {activeTab === 'text' && (
            <div className="flex items-center gap-1 animate-fadeIn">
              <CoreTools editor={editor} />
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
              <TextTools editor={editor} />
              <AlignTools editor={editor} />
            </div>
          )}

          {activeTab === 'structure' && (
            <div className="flex items-center gap-1 animate-fadeIn">
               <CoreTools editor={editor} />
               <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
               <StructureTools editor={editor} />
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="flex items-center gap-1 animate-fadeIn">
              <span className="text-sm text-gray-500 mr-2">Select text and click:</span>
              <AITool editor={editor} />
            </div>
          )}

          {activeTab === 'media' && (
            <div className="flex items-center gap-1 animate-fadeIn">
              <MediaTools editor={editor} />
              <ConvertTools editor={editor} />
            </div>
          )}

          {activeTab === 'table' && (
             <div className="flex items-center gap-1 animate-fadeIn">
               <TableTools editor={editor} />
             </div>
          )}

          {activeTab === 'history' && (
             <div className="flex items-center gap-1 animate-fadeIn">
               <HistoryTools editor={editor} />
             </div>
          )}

        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative bg-white dark:bg-gray-800">
        <div className=" mx-auto px-6 py-8 min-h-[500px]">
          <EditorContent
            editor={editor}
            className="prose prose-lg dark:prose-invert max-w-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;