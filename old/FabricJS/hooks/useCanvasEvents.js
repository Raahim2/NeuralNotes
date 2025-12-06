// hooks/useCanvasEvents.js

"use client";

import { useEffect, useRef } from 'react';

export const useCanvasEvents = (fabricCanvasRef) => {
  const isPanning = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const DOUBLE_CLICK_DELAY = 5000; // ms

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (opt) => {
      // --- NEW LOGIC: Boundary Check ---
      const page = canvas.getObjects().find(obj => obj.isA4Page);
      // If the page object doesn't exist for some reason, bail out.
      if (!page) return;

      // Get the click coordinates relative to the canvas.
      const pointer = canvas.getPointer(opt.e);
      const pageBounds = page.getBoundingRect();

      // Check if the click occurred within the page's boundaries.
      const isClickInsidePage = (
        pointer.x >= pageBounds.left &&
        pointer.x <= pageBounds.left + pageBounds.width &&
        pointer.y >= pageBounds.top &&
        pointer.y <= pageBounds.top + pageBounds.height
      );

      // If the click is inside the page, do nothing related to panning.
      // Let Fabric's default behavior (like text editing on double-click) handle it.
      if (isClickInsidePage) {
        return;
      }
      // --- END NEW LOGIC ---

      // If we are here, the click was OUTSIDE the page.
      // Proceed with the double-click-to-pan logic for the grey background area.
      
      clickCount.current++;

      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
        clickTimer.current = null;
        
        // Start panning because this is a confirmed double-click outside the page
        isPanning.current = true;
        canvas.selection = false;
        canvas.defaultCursor = 'grabbing';
        lastPosition.current = { x: opt.e.clientX, y: opt.e.clientY };
        canvas.renderAll();
        
      } else {
        // Start a timer on the first click
        clickTimer.current = setTimeout(() => {
          clickTimer.current = null;
          clickCount.current = 0;
        }, DOUBLE_CLICK_DELAY);
      }
    };

    const handleMouseMove = (opt) => {
      // This logic doesn't change; it only runs if isPanning is true
      if (isPanning.current) {
        const deltaX = opt.e.clientX - lastPosition.current.x;
        const deltaY = opt.e.clientY - lastPosition.current.y;
        
        canvas.relativePan({ x: deltaX, y: deltaY });

        lastPosition.current = { x: opt.e.clientX, y: opt.e.clientY };
      }
    };

    const handleMouseUp = () => {
      // This logic doesn't change; it resets the state after a pan
      if (isPanning.current) {
        isPanning.current = false;
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        clickCount.current = 0;
        canvas.renderAll();
      }
    };

    // --- Original Zooming and Constraining Logic (Unchanged) ---
    const handleMouseWheel = (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.99 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    };

    const handleObjectMoving = (e) => {
      const obj = e.target;
      const page = canvas.getObjects().find(obj => obj.isA4Page);
      if (!page) return;

      const pageBounds = page.getBoundingRect();
      const objWidth = obj.getScaledWidth();
      const objHeight = obj.getScaledHeight();

      if (obj.left < pageBounds.left) obj.left = pageBounds.left;
      if (obj.top < pageBounds.top) obj.top = pageBounds.top;
      if (obj.left + objWidth > pageBounds.left + pageBounds.width) {
        obj.left = pageBounds.left + pageBounds.width - objWidth;
      }
      if (obj.top + objHeight > pageBounds.top + pageBounds.height) {
        obj.top = pageBounds.top + pageBounds.height - objHeight;
      }
    };

    // --- Attaching and Detaching Event Listeners ---
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('mouse:wheel', handleMouseWheel);
    canvas.on('object:moving', handleObjectMoving);

    // Cleanup function
    return () => {
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
      canvas.off('mouse:wheel');
      canvas.off('object:moving');
    };
  }, [fabricCanvasRef]);
};