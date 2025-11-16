'use client';

interface FooterProps {
  profile: {
    name: string;
    title: string;
    description: string;
    logo_url: string;
    profile_image_url: string;
  } | null;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-blue-200/95 to-pink-200/95 border-t border-white/30 backdrop-blur-2xl py-6 relative z-10">
      <div className="container max-w-6xl mx-auto px-4 text-center">
        <p className="text-blue-900 font-semibold">
          © 2025 {profile?.name}. Crafting Digital Experiences.
        </p>
      </div>
    </footer>
  );
}
