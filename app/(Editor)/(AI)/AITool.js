"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import CustomBubbleMenu from './CustomBubbleMenu'; 

const AITool = ({ editor }) => {
    if (!editor) return null;

    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const [selectionRange, setSelectionRange] = useState(null);
    const [accumulatedResponse, setAccumulatedResponse] = useState('');

    const inputRef = useRef(null);

    // Focus input when menu opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }, [isOpen]);

    const handleOpenAI = () => {
        const { from, to, empty } = editor.state.selection;
        if (empty) return;

        const text = editor.state.doc.textBetween(from, to);
        setOriginalText(text);
        setSelectionRange({ from, to });
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setPrompt('');
        setAccumulatedResponse('');
        setSelectionRange(null);
        // Return focus to editor
        editor.chain().focus().run();
    };

    const handleReject = () => {
        if (selectionRange && originalText) {
            editor.chain().focus()
                .setTextSelection({ from: selectionRange.from, to: selectionRange.from + accumulatedResponse.length })
                .insertContent(originalText)
                .run();
        }
        handleClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setAccumulatedResponse(''); 

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: prompt,
                    selectedText: originalText
                })
            });

            if (!response.ok) throw new Error(response.statusText);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            // Delete selection just before streaming starts
            editor.chain().focus().setTextSelection(selectionRange).deleteSelection().run();

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: !done });
                
                if (chunkValue) {
                    setAccumulatedResponse(prev => prev + chunkValue);
                    editor.chain().insertContent(chunkValue).run();
                }
            }

        } catch (error) {
            console.error("AI Error:", error);
            // Restore original text on error
            editor.chain().focus().insertContent(originalText).run();
        } finally {
            setIsLoading(false);
        }
    };

    const shouldShow = useCallback(() => isOpen, [isOpen]);

    return (
        <>
            {/* Toolbar Button */}
            <button
                type="button"
                onClick={handleOpenAI}
                className={`p-1.5 rounded-md transition-all duration-200 mr-1 ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                title="AI Edit"
            >
                {/* Sparkle Icon */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            </button>

            {/* Bubble Menu */}
            {isOpen && (
                <CustomBubbleMenu
                    editor={editor}
                    pluginKey="ai-menu"
                    shouldShow={shouldShow}
                    tippyOptions={{
                        placement: 'bottom-start',
                        offset: [0, 10],
                        maxWidth: 'none',
                        zIndex: 99999,
                    }}
                >
                    {/* UI Container - Light Mode */}
                    <div className="flex flex-col w-[450px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden font-sans relative">
                        
                        {/* X Close Button */}
                        <button 
                            onClick={handleClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 z-10 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* INPUT STATE (Before generation) */}
                        {!accumulatedResponse && !isLoading && (
                            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                                <label className="text-sm font-semibold text-gray-700">
                                    Edit Selection with AI
                                </label>
                                
                                {/* Input Field - Styled like the reference */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="w-full p-3 text-gray-800 bg-gray-50 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white transition-all placeholder-gray-400 text-sm"
                                    placeholder="Make the text shorter, fix grammar, etc..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => e.stopPropagation()} // Prevent editor from capturing keys
                                />

                                {/* Footer Buttons */}
                                <div className="flex justify-end items-center gap-2 mt-1">
                                    <button 
                                        type="button" 
                                        onClick={handleClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Generate Edit
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* REVIEW STATE (During/After generation) */}
                        {(isLoading || accumulatedResponse) && (
                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3 mb-2">
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700">
                                        {isLoading ? "Generating changes..." : "Review Changes"}
                                    </span>
                                </div>

                                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 max-h-32 overflow-y-auto italic">
                                    "{accumulatedResponse}"
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button 
                                        onClick={handleReject} 
                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        onClick={handleClose} 
                                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-sm transition-colors"
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </CustomBubbleMenu>
            )}
        </>
    );
};

export default AITool;