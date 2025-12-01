import React from 'react';
import { User } from '../types';
import { ActivityChart } from '../components/Charts';
import { MapPinIcon, ActivityIcon } from '../components/Icons';
import GreenFalconsLogo from '../components/GreenFalconsLogo';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  return (
    <div className="pb-28 pt-safe min-h-full relative z-10 overflow-y-auto px-6">
      
      <div className="mt-8 mb-6 flex justify-center">
        <div className="glass-card p-8 rounded-[40px] w-full max-w-sm flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-500/20 to-transparent pointer-events-none" />
          
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-brand-500 to-brand-700 p-1 mb-4 shadow-2xl shadow-brand-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[20px] flex items-center justify-center text-4xl font-bold text-white">
              {user.name.charAt(0)}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <div className="flex items-center text-brand-200 text-sm mt-1 mb-4">
             <MapPinIcon className="w-3 h-3 mr-1" />
             {user.area}
             <span className="mx-2">•</span>
             <span>{user.age} y/o</span>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            {user.favoriteSports.map(s => (
              <span key={s} className="px-4 py-1.5 glass-panel border-white/10 text-white text-xs rounded-full font-bold uppercase tracking-wide">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 max-w-sm mx-auto">
        {/* Stats Section */}
        <div className="glass-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center">
              <ActivityIcon className="w-5 h-5 text-brand-400 mr-2" />
              Weekly Activity
            </h3>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Last 7 days</span>
          </div>
          <div className="h-40">
            <ActivityChart />
          </div>
        </div>

        {/* Bio Section */}
        <div className="glass-card p-6 rounded-3xl">
          <h3 className="font-bold text-white mb-3">About</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Enthusiastic about sports and meeting new people in Riyadh. Looking to stay active and make friends!
          </p>
        </div>

        <button 
          onClick={onLogout}
          className="w-full py-4 text-red-400 font-bold text-sm rounded-2xl glass-panel hover:bg-red-500/10 transition-all border border-red-500/20"
        >
          Log Out
        </button>

        {/* Green Falcons Credit */}
        <div className="mt-6 mb-2 flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
           <p className="text-[9px] font-bold text-brand-300 uppercase tracking-[0.2em] mb-2">Designed by</p>
           <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
              <GreenFalconsLogo className="w-8 h-8" />
              <span className="text-xs font-bold text-white tracking-wide">Green Falcons</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;