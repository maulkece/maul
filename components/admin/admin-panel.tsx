'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import PasswordModal from './password-modal';

interface AdminPanelProps {
  onClose: () => void;
  profile: any;
  languages: any[];
  projects: any[];
  edits: any[];
  onDataUpdate: () => void;
}

export default function AdminPanel({
  onClose,
  profile,
  languages,
  projects,
  edits,
  onDataUpdate
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const supabase = createClient();

  if (!isAuthenticated) {
    return (
      <PasswordModal
        onClose={onClose}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 flex justify-between items-center rounded-t-2xl">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:bg-white/20 p-2 rounded-lg transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {['profile', 'languages', 'projects', 'edits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'profile' && (
            <ProfileEditor profile={profile} supabase={supabase} onUpdate={onDataUpdate} />
          )}
          {activeTab === 'languages' && (
            <LanguagesEditor languages={languages} supabase={supabase} onUpdate={onDataUpdate} />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor projects={projects} supabase={supabase} onUpdate={onDataUpdate} />
          )}
          {activeTab === 'edits' && (
            <EditsEditor edits={edits} supabase={supabase} onUpdate={onDataUpdate} />
          )}
        </div>
      </div>
    </div>
  );
}

// Profile Editor
function ProfileEditor({ profile, supabase, onUpdate }: any) {
  const [formData, setFormData] = useState(profile || {});
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (profile?.id) {
        await supabase.from('profiles').update(formData).eq('id', profile.id);
      } else {
        await supabase.from('profiles').insert([formData]);
      }
      alert('Profile updated successfully!');
      onUpdate();
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
        <input
          type="url"
          value={formData.profile_image_url || ''}
          onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
        <input
          type="url"
          value={formData.logo_url || ''}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  );
}

// Languages Editor
function LanguagesEditor({ languages, supabase, onUpdate }: any) {
  const [items, setItems] = useState(languages || []);
  const [newItem, setNewItem] = useState({ name: '', icon_url: '' });

  const handleAdd = async () => {
    if (!newItem.name) return;
    try {
      await supabase.from('programming_languages').insert([newItem]);
      setNewItem({ name: '', icon_url: '' });
      onUpdate();
    } catch (error) {
      alert('Error adding language');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('programming_languages').delete().eq('id', id);
      onUpdate();
    } catch (error) {
      alert('Error deleting language');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Language Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="url"
          placeholder="Icon URL"
          value={newItem.icon_url}
          onChange={(e) => setNewItem({ ...newItem, icon_url: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Language
      </button>

      <div className="space-y-2 mt-6">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <img src={item.icon_url || "/placeholder.svg"} alt={item.name} className="w-8 h-8 object-contain" />
              <span className="font-medium">{item.name}</span>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects Editor
function ProjectsEditor({ projects, supabase, onUpdate }: any) {
  const [items, setItems] = useState(projects || []);
  const [newItem, setNewItem] = useState({ title: '', description: '', image_url: '' });

  const handleAdd = async () => {
    if (!newItem.title) return;
    try {
      await supabase.from('projects').insert([newItem]);
      setNewItem({ title: '', description: '', image_url: '' });
      onUpdate();
    } catch (error) {
      alert('Error adding project');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('projects').delete().eq('id', id);
      onUpdate();
    } catch (error) {
      alert('Error deleting project');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Project Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={newItem.image_url}
          onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Project
      </button>

      <div className="space-y-2 mt-6 max-h-96 overflow-y-auto">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between items-start bg-gray-100 p-4 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Edits Editor
function EditsEditor({ edits, supabase, onUpdate }: any) {
  const [items, setItems] = useState(edits || []);
  const [newItem, setNewItem] = useState({ title: '', description: '', thumbnail_url: '' });

  const handleAdd = async () => {
    if (!newItem.title) return;
    try {
      await supabase.from('edits').insert([newItem]);
      setNewItem({ title: '', description: '', thumbnail_url: '' });
      onUpdate();
    } catch (error) {
      alert('Error adding edit');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('edits').delete().eq('id', id);
      onUpdate();
    } catch (error) {
      alert('Error deleting edit');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Edit Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="url"
          placeholder="Thumbnail URL"
          value={newItem.thumbnail_url}
          onChange={(e) => setNewItem({ ...newItem, thumbnail_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Edit
      </button>

      <div className="space-y-2 mt-6 max-h-96 overflow-y-auto">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between items-start bg-gray-100 p-4 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 ml-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
