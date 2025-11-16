'use client';

interface HeroProps {
  profile: {
    name: string;
    title: string;
    description: string;
    logo_url: string;
    profile_image_url: string;
  } | null;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="hero min-h-screen flex items-center pt-20 relative z-10" id="home">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-wrap">
          <div className="flex-1 text-white min-w-96 animate-in slide-in-from-left">
            <div className="overflow-hidden mb-4">
              <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk leading-tight drop-shadow-lg">
                Creative<br />
                <span className="bg-gradient-to-r from-pink-200 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Editor
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-4 text-white/95 drop-shadow">
              {profile?.title}
            </p>
            <p className="text-lg mb-8 text-white/90 drop-shadow">
              {profile?.description}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-300 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:translate-y-[-4px] drop-shadow-lg"
            >
              <span>Get In Touch</span>
              <span className="animate-bounce">→</span>
            </a>
          </div>

          <div className="flex-1 flex justify-center items-center min-w-96 animate-in slide-in-from-right">
            <div className="relative">
              <img
                src={profile?.profile_image_url || '/placeholder.svg?height=400&width=300&query=portfolio'}
                alt="Profile"
                className="w-72 h-96 object-cover rounded-2xl shadow-2xl border-4 border-white animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
