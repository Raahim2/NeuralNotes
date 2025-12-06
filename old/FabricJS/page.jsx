// EditorPage.jsx

"use client";

import React, { useRef, useState } from 'react';
import Navbar from './navbar.jsx';
import Sidebar from './sidebar.jsx';
import TextSidebar from './(Text)/TextSidebar.jsx';
import Editor from './editor.jsx';
import TextToolbar from './(Text)/TextToolbar.jsx'; // 1. Import the TextToolbar

const EditorPage = () => {
  const editorRef = useRef(null);
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [selectedText, setSelectedText] = useState(null); // 2. State to hold selected text properties

  const handleSidebarClick = (label) => {
    setActiveSidebar(prev => (prev === label ? null : label));
  };

  const handleAddText = (type) => {
    if (!editorRef.current) {
      console.error("Editor reference is not available.");
      return;
    }
    switch (type) {
      case 'heading':
        editorRef.current.addText('Add a heading', { fontSize: 88, fontWeight: 'bold' });
        break;
      case 'subheading':
        editorRef.current.addText('Add a subheading', { fontSize: 56, fontWeight: '600' });
        break;
      case 'body':
        editorRef.current.addText('Add a little bit of body text', { fontSize: 32 });
        break;
      default:
        editorRef.current.addText('Add a text box');
        break;
    }
  };

  // 3. Handler to update the state when selection changes in the editor
  const handleSelectionChange = (properties) => {
    setSelectedText(properties);
  };

  // 4. Handler to update text properties from the toolbar
  const handleTextPropertyChange = (property, value) => {
    if (editorRef.current) {
      editorRef.current.updateTextProperty(property, value);
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-grow min-h-0">
        <Sidebar onItemClick={handleSidebarClick} activeItem={activeSidebar} />
        
        {activeSidebar === 'Text' &&  
          <div>
            <TextSidebar onAddText={handleAddText} />
          </div>
        }

        <main className="flex-grow flex flex-col relative bg-[#F0F2F5]">
          {/* 5. Conditionally render the toolbar if a text object is selected */}
          {selectedText && (
            <TextToolbar 
              properties={selectedText} 
              onPropertyChange={handleTextPropertyChange} 
            />
          )}
          <Editor ref={editorRef} onSelectionChange={handleSelectionChange} />
        </main>
      </div>
    </div>
  );
};

export default EditorPage;