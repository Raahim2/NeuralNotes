// app/(Editor)/(Convert)/ConvertTools.js
"use client"; // Ensure this is a client component
import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ConvertTools = ({ editor }) => {
    // 1. ALWAYS CALL HOOKS FIRST (Unconditionally)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    // 2. FUNCTIONS
    const handleFileChange = (event) => {
        if (!editor) return; // Check editor existence inside function
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            const arrayBuffer = loadEvent.target.result;
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(result => {
                    editor.commands.setContent(result.value, true);
                })
                .catch(error => {
                    console.error("Error converting .docx file:", error);
                    alert("Could not import the document. Please ensure it's a valid .docx file.");
                });
        };
        reader.readAsArrayBuffer(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const exportAs = (format) => {
        if (!editor) return;
        let content, blobType, fileName;

        switch (format) {
            case 'pdf':
                const editorContent = document.querySelector('.tiptap');
                if (editorContent) {
                    html2canvas(editorContent).then(canvas => {
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const canvasWidth = canvas.width;
                        const canvasHeight = canvas.height;
                        const ratio = canvasWidth / canvasHeight;
                        const pdfHeight = pdfWidth / ratio;
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        pdf.save('document.pdf');
                    });
                }
                setIsModalOpen(false);
                return;

            case 'doc':
                content = editor.getHTML();
                const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                    "xmlns='http://www.w3.org/TR/REC-html40'>" +
                    "<head><meta charset='utf-8'><title>Export HTML to Word Document</title></head><body>";
                const footer = "</body></html>";
                content = header + content + footer;
                blobType = 'application/msword';
                fileName = 'document.doc';
                break;

            case 'txt':
                content = editor.getText();
                blobType = 'text/plain';
                fileName = 'document.txt';
                break;

            case 'html':
                content = editor.getHTML();
                blobType = 'text/html';
                fileName = 'document.html';
                break;
            
            case 'json':
                content = JSON.stringify(editor.getJSON(), null, 2);
                blobType = 'application/json';
                fileName = 'document.json';
                break;

            default:
                return;
        }

        const blob = new Blob(['\ufeff', content], { type: blobType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsModalOpen(false);
    };

    // 3. CONDITIONAL RETURN LAST
    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".docx"
                />
                
                {/* Import Button */}
                <button onClick={triggerFileInput} type="button" className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 11V3.914l-2.293 2.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 3.914V11a1 1 0 1 1-2 0Z"/>
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"/>
                    </svg>
                    <span className="sr-only">Import</span>
                </button>

                {/* Export Button */}
                <button onClick={() => setIsModalOpen(true)} type="button" className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z"/>
                    </svg>
                    <span className="sr-only">Export</span>
                </button>

                <div className="px-1">
                    <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                </div>
            </div>

            {/* Export Modal */}
            {isModalOpen && (
                <div id="export-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/50 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex justify-between items-center p-4 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Options</h3>
                                <button onClick={() => setIsModalOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* FIXED: Replaced ' with &apos; */}
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Choose the format you&apos;d like to export the document as.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button onClick={() => exportAs('pdf')} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Export as PDF</button>
                                    <button onClick={() => exportAs('doc')} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Export as DOC</button>
                                    <button onClick={() => exportAs('txt')} className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Export as TXT</button>
                                    <button onClick={() => exportAs('html')} className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Export as HTML</button>
                                    <button onClick={() => exportAs('json')} className="w-full col-span-2 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Export Editor JSON</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConvertTools;