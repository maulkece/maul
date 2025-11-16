'use client';

import { useState } from 'react';

interface PasswordModalProps {
  onClose: () => void;
  onAuthenticated: () => void;
}

export default function PasswordModal({ onClose, onAuthenticated }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple password check (in production, this should be hashed and verified on backend)
    // Default password: admin123
    if (password === 'admin123') {
      onAuthenticated();
    } else {
      setError('Password salah. Coba lagi.');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 rounded-t-2xl">
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <p className="text-gray-600 text-sm mb-4">
            Masukkan password untuk mengakses admin panel
          </p>

          <div>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              autoFocus
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Login'}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Press Escape to close
          </p>
        </form>
      </div>
    </div>
  );
}
