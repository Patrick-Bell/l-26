import React from 'react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 404 Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <AlertCircle className="w-16 h-16 text-zinc-900" strokeWidth={1.5} />
          </div>
        </div>

        {/* Error Code */}
        <div className="text-center mb-4">
          <h1 className="text-6xl font-black italic tracking-tighter text-zinc-900 mb-2">
            404
          </h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">
            Page Not Found
          </p>
        </div>

        {/* Message */}
        <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-4 mb-6">
          <p className="text-sm text-zinc-600 text-center font-medium">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white border border-zinc-200 rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-zinc-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-900" />
            <span className="text-sm font-black uppercase tracking-wider text-zinc-900 italic">
              Go Back
            </span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-zinc-800 transition-colors"
          >
            <Home className="w-4 h-4 text-white" />
            <span className="text-sm font-black uppercase tracking-wider text-white italic">
              Home
            </span>
          </button>
        </div>

        {/* Helper Links */}
        <div className="mt-8 text-center">
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Quick Links
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-[10px] font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-wider cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/matches')}
              className="text-[10px] font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-wider cursor-pointer"
            >
              Matches
            </button>
            <button
              onClick={() => navigate('/players')}
              className="text-[10px] font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-wider cursor-pointer"
            >
              Players
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;