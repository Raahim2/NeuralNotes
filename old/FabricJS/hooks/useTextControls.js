import * as fabric from 'fabric';

export const useTextControls = (fabricCanvasRef, onSelectionChange) => {

  const addText = (text = 'Type here...', options = {}) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Center on the A4 page, or the canvas if no page exists
    const page = canvas.getObjects().find(obj => obj.isA4Page);
    const pageCenter = page ? page.getCenterPoint() : { x: canvas.getWidth() / 2, y: canvas.getHeight() / 2 };

    const newText = new fabric.IText(text, {
      left: pageCenter.x,
      top: pageCenter.y,
      originX: 'center',
      originY: 'center',
      fontSize: 40,
      fill: '#000000',
      fontFamily: 'Times New Roman',
      ...options,
    });

    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
  };
  
  const toggleBulletPoints = (textObject) => {
    const text = textObject.text;
    const lines = text.split('\n');
    const isBulleted = lines.every(line => line.trim().startsWith('•'));

    let newText;
    if (isBulleted) {
      // Remove bullets
      newText = lines.map(line => line.replace(/^•\s?/, '')).join('\n');
    } else {
      // Add bullets
      newText = lines.map(line => line.trim() ? `• ${line}` : line).join('\n');
    }
    
    textObject.set('text', newText);
  };
  
  const updateTextProperty = (property, value) => {
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text') {
      // Special handler for bullet points
      if (property === 'toggleBullet') {
        toggleBulletPoints(activeObject);
      } else {
        // Standard property update
        activeObject.set(property, value);
      }

      canvas.renderAll();
      
      // Notify the parent component of the change so the toolbar can update
      const properties = {
        fontSize: activeObject.get('fontSize'),
        fontWeight: activeObject.get('fontWeight'),
        fontStyle: activeObject.get('fontStyle'),
        underline: activeObject.get('underline'),
        linethrough: activeObject.get('linethrough'),
        textAlign: activeObject.get('textAlign'),
        fontFamily: activeObject.get('fontFamily'),
      };
      onSelectionChange(properties);
    }
  };

  return { addText, updateTextProperty };
};