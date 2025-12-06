"use client";

import { useEffect, useCallback } from 'react';

export const useKeyboardEvents = (fabricCanvasRef) => {

  const deleteActiveObjects = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const activeObjects = canvas.getActiveObjects();
    if (!activeObjects.length) return;

    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }, [fabricCanvasRef]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent shortcuts from firing when typing in an input
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteActiveObjects();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [deleteActiveObjects]);
};