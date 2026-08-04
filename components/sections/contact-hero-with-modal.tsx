'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { Modal } from '@/components/ui/modal';
import { ContactForm } from '@/components/sections/contact-form';

export function ContactHeroWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Hero
        headline="Get in Touch"
        highlightedText=""
        description="Ready to scale your AI initiatives with high-quality training data? Start a conversation with our global team of experts today."
        primaryCTA={{ 
          label: "Message Us", 
          onClick: () => setIsModalOpen(true) 
        }}
      />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-1">
          <h2 className="text-2xl font-bold text-white mb-6 px-4 md:px-6">Send us a message</h2>
          <ContactForm 
            onSuccess={() => setIsModalOpen(false)} 
            className="w-full max-w-full backdrop-blur-none bg-transparent border-none p-4 md:p-6 shadow-none" 
          />
        </div>
      </Modal>
    </>
  );
}
