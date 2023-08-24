import React from 'react';

export interface ToolInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  Component: React.FC;
  keywords?: string;
  description?: string;
}

export interface GroupInfo {
  id: string;
  name: string;
  tools: ToolInfo[];
}
