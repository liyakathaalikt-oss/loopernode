import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, Briefcase, Image as ImageIcon, Settings, Users, MessageSquare, BookOpen, MessageCircle, HelpCircle } from 'lucide-react';
import { SignOutButton } from '../sign-out-button';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pages', label: 'Global Pages', icon: FileText },
  { href: '/admin/blog', label: 'Blog Posts', icon: MessageSquare },
  { href: '/admin/case-studies', label: 'Case Studies', icon: BookOpen },
  { href: '/admin/services', label: 'Services', icon: LayoutDashboard },
  { href: '/admin/careers', label: 'Careers', icon: Briefcase },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageCircle },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-dark-900 border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
          CMS Admin
        </span>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <SignOutButton />
      </div>
    </aside>
  );
}
