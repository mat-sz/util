export const isClipboardItemSupported = 'ClipboardItem' in window;
export const isClipboardReadSupported =
  'clipboard' in navigator && !!navigator.clipboard.read;
