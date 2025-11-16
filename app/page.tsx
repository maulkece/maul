'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Portfolio from '@/components/portfolio';
import TopEdits from '@/components/top-edits';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import AdminPanel from '@/components/admin/admin-panel';
import Canvas from '@/components/canvas-background';

interface Profile {
  name: string;
  title: string;
  description: string;
  logo_url: string;
  profile_image_url: string;
}

interface Language {
  id: string;
  name: string;
  icon_url: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

interface Edit {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [edits, setEdits] = useState<Edit[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (!profileError && profileData) {
          setProfile(profileData);
        }

        // Fetch languages
        const { data: languagesData, error: languagesError } = await supabase
          .from('programming_languages')
          .select('*');

        if (!languagesError && languagesData) {
          setLanguages(languagesData);
        }

        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');

        if (!projectsError && projectsData) {
          setProjects(projectsData);
        }

        // Fetch edits
        const { data: editsData, error: editsError } = await supabase
          .from('edits')
          .select('*');

        if (!editsError && editsData) {
          setEdits(editsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
      // ESC to close admin
      if (e.key === 'Escape' && showAdmin) {
        setShowAdmin(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Canvas />
      <Header profile={profile} />
      <Hero profile={profile} />
      <About />
      <Skills languages={languages} />
      <Portfolio projects={projects} />
      <TopEdits edits={edits} />
      <Contact profile={profile} />
      <Footer profile={profile} />
      
      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
          profile={profile}
          languages={languages}
          projects={projects}
          edits={edits}
          onDataUpdate={() => {
            // Refresh data after updates
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
          }}
        />
      )}
    </div>
  );
}
