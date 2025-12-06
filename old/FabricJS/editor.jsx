"use client";

import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import * as fabric from 'fabric';
import { useFabricCanvas } from '@/hooks/useFabricCanvas'; // Initialize Fabric A4 canvas 
import { useKeyboardEvents } from '@/hooks/useKeyboardEvents'; // Handle keyboard events
import { useCanvasEvents } from '@/hooks/useCanvasEvents'; // Handle zooming and panning
import { useTextControls } from '@/hooks/useTextControls'; // Handle text manipulation

const Editor = forwardRef(({ onSelectionChange }, ref) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const fabricCanvasRef = useFabricCanvas(canvasRef, containerRef);
  useKeyboardEvents(fabricCanvasRef);
  useCanvasEvents(fabricCanvasRef);
  
  // 2. Use the hook to get text manipulation functions
  const { addText, updateTextProperty } = useTextControls(fabricCanvasRef, onSelectionChange);

  // Effect to handle canvas selection events remains the same
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const getSelectedTextProperties = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'i-text') {
        onSelectionChange({
          fontSize: activeObject.get('fontSize'),
          fontWeight: activeObject.get('fontWeight'),
          fontStyle: activeObject.get('fontStyle'),
          underline: activeObject.get('underline'),
          linethrough: activeObject.get('linethrough'),
          textAlign: activeObject.get('textAlign'),
          fontFamily: activeObject.get('fontFamily'),
        });
      } else {
        onSelectionChange(null);
      }
    };

    canvas.on('selection:created', getSelectedTextProperties);
    canvas.on('selection:updated', getSelectedTextProperties);
    canvas.on('selection:cleared', () => onSelectionChange(null));
    canvas.on('object:modified', getSelectedTextProperties);

    return () => {
      // Clean up listeners
      canvas.off('selection:created');
      canvas.off('selection:updated');
      canvas.off('selection:cleared');
      canvas.off('object:modified');
    };
  }, [fabricCanvasRef, onSelectionChange]);


  // 3. Expose functions to the parent component
  useImperativeHandle(ref, () => ({
    addText,
    updateTextProperty,
  }));

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );
});

Editor.displayName = 'Editor';
export default Editor;