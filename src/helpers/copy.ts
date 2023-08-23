import { isClipboardItemSupported } from './browser.js';

export const copy = async (text: string) => {
  try {
    if (isClipboardItemSupported) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    //
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;

    area.ariaHidden = 'true';

    area.style.all = 'unset';

    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.left = '0';
    area.style.clip = 'rect(0, 0, 0, 0)';

    area.style.whiteSpace = 'pre';
    area.style.userSelect = 'text';

    document.body.appendChild(area);
    area.focus();
    area.select();

    document.execCommand('copy');
    document.body.removeChild(area);
  } catch {
    //
  }
};
