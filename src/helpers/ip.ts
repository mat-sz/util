export const aton4 = (address: string) => {
  const split = address.split('.');
  if (split.length !== 4) {
    return undefined;
  }

  const octets = split.map(val => {
    const int = parseInt(val);
    if (isNaN(int)) {
      return undefined;
    }

    if (int > 255 || int < 0) {
      return undefined;
    }

    return int;
  });

  if (octets.some(octet => typeof octet === 'undefined')) {
    return undefined;
  }

  return (
    ((octets[0]! << 24) +
      (octets[1]! << 16) +
      (octets[2]! << 8) +
      octets[3]!) >>>
    0
  );
};

export const ntoa4 = (address?: number) => {
  if (typeof address === 'undefined') {
    return undefined;
  }

  return [
    (address >> 24) & 255,
    (address >> 16) & 255,
    (address >> 8) & 255,
    address & 255,
  ].join('.');
};

export const aton6 = (address: string) => {
  if (
    !address.includes(':') ||
    address.indexOf('::') !== address.lastIndexOf('::')
  ) {
    return undefined;
  }

  let out = BigInt(0);
  const split = address.split(':');
  if (address.startsWith('::')) {
    split.shift();
  }

  let i = 1;
  for (const str of split) {
    if (str === '') {
      if (!split[i]) {
        return undefined;
      }

      i = 8 - (split.length - (i + 1));
      continue;
    }

    const int = parseInt(str, 16);

    if (isNaN(int) || typeof int !== 'number') {
      return undefined;
    }

    const octet = BigInt(parseInt(str, 16));
    const shift = BigInt(128 - 16 * i);

    out += octet << shift;
    i++;
  }

  return BigInt.asUintN(128, out);
};

export const ntoa6 = (address?: bigint, full = false) => {
  if (typeof address === 'undefined') {
    return undefined;
  }

  const parts = [];
  let current = address;
  while (current > 0) {
    const part = (current & BigInt(65535)).toString(16);
    parts.push(full ? part.padStart(4, '0') : part);
    current = current >> BigInt(16);
  }

  while (parts.length < 8) {
    parts.push(full ? '0000' : '0');
  }

  parts.reverse();

  if (!full) {
    const zeroChains: Record<number, number> = {};
    let zeroIndex = -1;
    let longestIndex = -1;
    let longestCount = -1;

    for (let i = 0; i < 8; i++) {
      if (parseInt(parts[i], 16) !== 0) {
        zeroIndex = -1;
        continue;
      } else if (zeroIndex !== -1) {
        zeroChains[zeroIndex]++;
      } else {
        zeroIndex = i;
        zeroChains[i] = 1;
      }

      if (zeroChains[zeroIndex] > longestCount) {
        longestIndex = zeroIndex;
        longestCount = zeroChains[zeroIndex];
      }
    }

    if (longestIndex !== -1) {
      if (longestIndex === 0 && longestCount === 8) {
        return '::';
      }

      if (longestIndex + longestCount === parts.length) {
        longestCount--;
      }

      parts.splice(longestIndex, longestCount, '');
      if (longestIndex === 0) {
        parts.unshift('');
      }
    }
  }

  return parts.join(':');
};
