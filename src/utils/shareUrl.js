import LZString from 'lz-string';

/**
 * Zero-Database URL Sharing Engine for JD COMPILER
 * Uses high-efficiency LZ compression to serialize language, code, and filename into URL hash.
 */

export function encodeShareUrl({ language, code, fileName }) {
  if (!code && code !== '') return '';

  const payload = {
    l: language, // language id (e.g. 'python', 'c', 'cpp', 'java')
    c: code,     // source code string
    f: fileName || '' // optional filename
  };

  try {
    const jsonStr = JSON.stringify(payload);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://jdcodecompiler.vercel.app';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    return `${origin}${path}#share=${compressed}`;
  } catch (err) {
    console.error('Failed to encode share URL:', err);
    return '';
  }
}

export function decodeShareUrl(urlOrHash) {
  if (!urlOrHash || typeof urlOrHash !== 'string') return null;

  try {
    let token = '';

    // Check for #share=
    if (urlOrHash.includes('#share=')) {
      token = urlOrHash.split('#share=')[1];
    } else if (urlOrHash.includes('?share=')) {
      token = urlOrHash.split('?share=')[1];
    } else if (urlOrHash.startsWith('#')) {
      token = urlOrHash.substring(1);
    } else {
      token = urlOrHash;
    }

    // Clean any trailing query/hash fragments
    token = token.split('&')[0];

    if (!token) return null;

    const decompressed = LZString.decompressFromEncodedURIComponent(token);
    if (!decompressed) return null;

    const parsed = JSON.parse(decompressed);

    return {
      language: parsed.l || 'python',
      code: parsed.c ?? '',
      fileName: parsed.f || ''
    };
  } catch (err) {
    console.warn('Failed to decode share URL token:', err);
    return null;
  }
}
