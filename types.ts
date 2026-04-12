import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface TerminalMessage {
  type: 'user' | 'system' | 'ai';
  content: React.ReactNode;
  timestamp?: string;
}

export interface ServiceCardProps {
  icon: string;
  color: 'cyan' | 'pink' | 'yellow';
  title: string;
  description: string;
  metric?: string;
  href?: string;
}