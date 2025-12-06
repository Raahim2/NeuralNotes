"use client";

import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

export const useFabricCanvas = (canvasRef, containerRef) => {
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: container.clientWidth,
      height: container.clientHeight,
    });
    fabricCanvasRef.current = canvas;

    // Create and add A4 page background
    const a4Width = 794;
    const a4Height = 1123;
    const page = new fabric.Rect({
      width: a4Width, height: a4Height, fill: 'white', stroke: '#ccc', strokeWidth: 1,
      selectable: false, evented: false, absolutePositioned: true, isA4Page: true,
    });
    canvas.clipPath = page; // Clip objects to the page bounds
    canvas.add(page);
    canvas.centerObject(page);
    canvas.renderAll();

    // Setup Resize Observer to keep canvas dimensions responsive
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      canvas.setWidth(width);
      canvas.setHeight(height);
      canvas.centerObject(page);
      canvas.renderAll();
    });
    resizeObserver.observe(container);

    // Cleanup function
    return () => {
      resizeObserver.disconnect();
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [canvasRef, containerRef]);

  return fabricCanvasRef;
};