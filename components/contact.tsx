'use client';

import { useState } from 'react';

interface ContactProps {
  profile: {
    name: string;
    title: string;
    description: string;
    logo_url: string;
    profile_image_url: string;
  } | null;
}

export default function Contact({ profile }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Terima kasih! Pesan Anda telah dikirim.');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="contact" className="py-32 relative z-10 bg-transparent">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center animate-in slide-in-from-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900 font-space-grotesk relative pb-6 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-pink-300 after:to-pink-500 after:rounded">
            Let's Create Together
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Have a project in mind? Let's collaborate and bring your vision to life
          </p>

          <form onSubmit={handleSubmit} className="bg-white/15 backdrop-blur-2xl p-8 rounded-3xl border border-white/25">
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/8 border border-white/25 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/15"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-white/8 border border-white/25 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/15"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 bg-white/8 border border-white/25 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white/15 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-300 to-pink-500 text-white font-semibold py-3 rounded-full hover:shadow-xl transition-all hover:translate-y-[-4px] disabled:opacity-50 drop-shadow-lg"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="flex justify-center gap-6 mt-12 flex-wrap">
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/kemett._', color: '#E4405F' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/achmad-maulana-a85a681b3', color: '#0077B5' },
              { name: 'GitHub', url: 'https://github.com/Maul-Goat', color: '#333333' },
              { name: 'Email', url: 'mailto:achmadmaulanaxx@gmail.com', color: '#D44638' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@kaycee.onw', color: '#000000' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:scale-125 transition-all hover:shadow-lg animate-bounce"
                style={{
                  backgroundColor: social.color,
                  animationDelay: `${Math.random() * 0.8}s`
                }}
              >
                {social.name.charAt(0)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
