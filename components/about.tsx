'use client';

export default function About() {
  const aboutItems = [
    {
      icon: '👨‍💻',
      title: 'Developer & Creator',
      description: 'Expert in crafting responsive web applications and interactive digital experiences'
    },
    {
      icon: '🎬',
      title: 'Video Editor & Filmmaker',
      description: 'Specializing in cinematic editing, motion graphics, and compelling visual narratives'
    },
    {
      icon: '✨',
      title: 'Creative Problem Solver',
      description: 'Combining technical expertise with artistic vision to deliver exceptional results'
    }
  ];

  return (
    <section id="about" className="py-32 relative z-10 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900 font-space-grotesk relative pb-6 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-pink-300 after:to-pink-500 after:rounded">
          About Me
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {aboutItems.map((item, i) => (
            <div
              key={i}
              className="bg-white/15 backdrop-blur-2xl p-6 rounded-3xl border border-white/25 hover:bg-white/20 hover:translate-y-[-10px] transition-all shadow-lg animate-in slide-in-from-bottom"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4 inline-block animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/15 backdrop-blur-2xl p-8 rounded-3xl border border-white/25 text-center animate-in slide-in-from-bottom md:grid-cols-1">
          <p className="text-blue-900 text-lg leading-8">
            With over 5 years of experience in digital production and web development, I've had the privilege of collaborating with brands and creators to bring their visions to life. My approach combines technical precision with creative storytelling, ensuring every project leaves a lasting impact. Whether it's crafting immersive web experiences or producing cinematic content, I'm passionate about pushing creative boundaries and delivering excellence in every endeavor.
          </p>
        </div>
      </div>
    </section>
  );
}
