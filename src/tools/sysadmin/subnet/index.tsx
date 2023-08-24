import { IoGlobe } from 'react-icons/io5/index.js';

import { ToolInfo } from '../../../types.js';
import { Component } from './component.js';

export const subnet: ToolInfo = {
  id: 'subnet',
  name: 'IPv4/v6 subnet calculator',
  icon: <IoGlobe />,
  Component,
};
