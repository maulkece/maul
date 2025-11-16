'use client';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

interface PortfolioProps {
  projects: Project[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  return (
    <section id="portfolio" className="py-32 relative z-10 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900 font-space-grotesk relative pb-6 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-pink-300 after:to-pink-500 after:rounded">
          Featured Works
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white/15 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/25 hover:translate-y-[-15px] transition-all shadow-lg hover:shadow-2xl group"
              style={{
                animation: `slideUp 0.8s ease-out`,
                animationDelay: `${idx * 0.12}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image_url || '/placeholder.svg?height=220&width=320&query=project'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-pink-300/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-5 bg-white/8">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{project.description}</p>
                <a href="#" className="text-pink-500 font-semibold inline-flex items-center gap-2 hover:text-pink-300 hover:translate-x-2 transition-all">
                  Explore →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
