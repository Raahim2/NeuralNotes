import React, { useState, useRef } from 'react';

const MediaTools = ({ editor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mediaType, setMediaType] = useState(''); // 'image' or 'video'
    const [urlInput, setUrlInput] = useState('');
    const fileInputRef = useRef(null);

    if (!editor) {
        return null;
    }

    const openModal = (type) => {
        setMediaType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUrlInput('');
        setMediaType('');
    };

    const handleAddFromUrl = () => {
        if (!urlInput) return;
        if (mediaType === 'image') {
            editor.chain().focus().setImage({ src: urlInput }).run();
        } else if (mediaType === 'video') {
            editor.commands.setYoutubeVideo({ src: urlInput, width: 640, height: 480 });
        }
        closeModal();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => editor.chain().focus().setImage({ src: e.target.result }).run();
            reader.readAsDataURL(file);
        }
        closeModal();
    };

    const triggerFileUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                {/* Add Image Button */}
                <button onClick={() => openModal('image')} type="button" className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd"/>
                    </svg>
                    <span className="sr-only">Add image</span>
                </button>

                {/* Add Video Button */}
                <button onClick={() => openModal('video')} type="button" className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                       <path fillRule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-2 4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H9Zm0 2h2v2H9v-2Zm7.965-.557a1 1 0 0 0-1.692-.72l-1.268 1.218a1 1 0 0 0-.308.721v.733a1 1 0 0 0 .37.776l1.267 1.032a1 1 0 0 0 1.631-.776v-2.984Z" clipRule="evenodd"/>
                    </svg>
                    <span className="sr-only">Add video</span>
                </button>
                <div className="px-1">
                            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                        </div>
            </div>

            {/* Media Modal */}
            {isModalOpen && (
                <div id="media-modal" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black/50">
                    <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* ... Modal content remains the same ... */}
                             <div className="flex justify-between items-center p-4 rounded-t border-b dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add {mediaType === 'image' ? 'Image' : 'YouTube Video'}
                                </h3>
                                <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label htmlFor="media-url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                                    <input
                                        type="url"
                                        id="media-url"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder={mediaType === 'image' ? "https://example.com/image.jpg" : "https://www.youtube.com/watch?v=..."}
                                    />
                                </div>
                                {mediaType === 'image' && (
                                    <>
                                        <div className="flex items-center justify-center">
                                            <span className="block w-full h-px bg-gray-300 dark:bg-gray-600"></span>
                                            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
                                            <span className="block w-full h-px bg-gray-300 dark:bg-gray-600"></span>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <button onClick={triggerFileUpload} type="button" className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                            Upload from Computer
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                <button onClick={handleAddFromUrl} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Add from URL
                                </button>
                                <button onClick={closeModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MediaTools;