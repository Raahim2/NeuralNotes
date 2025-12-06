import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';

export const CustomBubbleMenu = (props) => {
  const {
    pluginKey = 'bubbleMenu',
    editor,
    updateDelay,
    resizeDelay,
    appendTo,
    shouldShow = null,
    tippyOptions = {}, 
    children,
    ...restProps
  } = props;

  const menuEl = useRef(null);
  if (!menuEl.current && typeof document !== 'undefined') {
    menuEl.current = document.createElement('div');
  }

  const pluginEditor = editor;

  // STABILIZE PROPS:
  // We use refs so these don't trigger the useEffect to re-run
  const tippyOptionsRef = useRef(tippyOptions);
  tippyOptionsRef.current = tippyOptions;
  
  const shouldShowRef = useRef(shouldShow);
  shouldShowRef.current = shouldShow;

  useEffect(() => {
    if (!pluginEditor || pluginEditor.isDestroyed || typeof document === 'undefined') {
      return;
    }

    const bubbleMenuElement = menuEl.current;
    bubbleMenuElement.style.visibility = 'hidden';
    bubbleMenuElement.style.position = 'absolute';

    const plugin = BubbleMenuPlugin({
      updateDelay,
      resizeDelay,
      appendTo,
      pluginKey,
      // Use a stable function that calls the current ref
      shouldShow: (props) => {
        return shouldShowRef.current ? shouldShowRef.current(props) : true;
      },
      element: bubbleMenuElement,
      editor: pluginEditor,
      tippyOptions: tippyOptionsRef.current,
    });

    pluginEditor.registerPlugin(plugin);

    return () => {
      pluginEditor.unregisterPlugin(pluginKey);
      if (bubbleMenuElement.parentNode) {
        bubbleMenuElement.parentNode.removeChild(bubbleMenuElement);
      }
    };
  }, [pluginEditor, pluginKey, updateDelay, resizeDelay, appendTo]); // Removed shouldShow/tippyOptions

  if (!menuEl.current) return null;
  
  return createPortal(
    <div {...restProps}>{children}</div>,
    menuEl.current
  );
};

export default CustomBubbleMenu;