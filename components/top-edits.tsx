'use client';

interface Edit {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
}

interface TopEditsProps {
  edits: Edit[];
}

export default function TopEdits({ edits }: TopEditsProps) {
  return (
    <section id="top-edits" className="py-32 relative z-10 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900 font-space-grotesk relative pb-6 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-pink-300 after:to-pink-500 after:rounded">
          My Top Edits
        </h2>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 animate-scroll">
            {edits.map((edit) => (
              <div
                key={edit.id}
                className="flex-shrink-0 w-72 h-96 bg-white/15 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/25 hover:translate-y-[-15px] hover:scale-105 transition-all shadow-lg hover:shadow-2xl group"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={edit.thumbnail_url || '/placeholder.svg?height=280&width=320&query=edit'}
                    alt={edit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 bg-white/8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{edit.title}</h3>
                  <p className="text-gray-700 text-sm">{edit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
