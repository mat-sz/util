import { useEffect, useRef } from 'react';

export function usePaste(onFile: (file: File) => void) {
  const callbackRef = useRef(onFile);

  useEffect(() => {
    callbackRef.current = onFile;
  }, [onFile]);

  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const element = e.target as HTMLElement;
      if (
        document.body.contains(element) &&
        (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT')
      ) {
        return;
      }

      for (const item of e.clipboardData!.items) {
        const file = item.getAsFile();

        if (file) {
          callbackRef.current(file);
          e.preventDefault();
        }
      }
    };

    document.addEventListener('paste', onPaste);

    return () => {
      document.removeEventListener('paste', onPaste);
    };
  }, []);
}
