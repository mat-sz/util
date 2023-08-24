import { TbHexagon } from 'react-icons/tb/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const hash: ToolInfo = {
  id: 'hash',
  name: 'Hash',
  icon: <TbHexagon />,
  Component,
  keywords:
    'md5 md-5 sha1 sha-1 sha128 sha-128 sha224 sha-224 sha256 sha-256 sha384 sha-384 sha512 sha-512 sha3 sha-3 ripemd160',
};
