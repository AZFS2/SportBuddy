import React, { useEffect, useState } from 'react';
import { BuddyProfile, Playground, SportType } from '../types';
import { generatePlaygrounds } from '../services/geminiService';
import { MapPinIcon, StarIcon, MessageCircleIcon, XIcon } from './Icons';

interface MatchSuccessModalProps {
  buddy: BuddyProfile;
  onClose: () => void;
  onChat: () => void;
}

const MatchSuccessModal: React.FC<MatchSuccessModalProps> = ({ buddy, onClose, onChat }) => {
  const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaygrounds = async () => {
      const results = await generatePlaygrounds(buddy.sport, buddy.area);
      setPlaygrounds(results);
      setLoading(false);
    };
    fetchPlaygrounds();
  }, [buddy]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface-50 w-full max-w-md rounded-3xl p-0 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-brand-600 to-brand-900 flex flex-col items-center justify-center text-center p-6">
          <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition"
          >
            <XIcon className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center -space-x-4 mb-4">
             <div className="w-20 h-20 rounded-full border-4 border-surface-50 overflow-hidden z-10">
               {/* Placeholder for User - assuming generic user icon or passed prop if we had user state accessible here */}
               <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-xl">You</div>
             </div>
             <div className="w-20 h-20 rounded-full border-4 border-surface-50 overflow-hidden z-20">
               <img src={buddy.avatarUrl} alt={buddy.name} className="w-full h-full object-cover" />
             </div>
          </div>
          
          <h2 className="text-3xl font-black text-white italic tracking-wider drop-shadow-md">IT'S A MATCH!</h2>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <p className="text-center text-gray-300 mb-6">
            You and <span className="font-bold text-white">{buddy.name}</span> both want to play <span className="text-brand-400">{buddy.sport}</span>.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Suggested Venues</h3>
              {loading && <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>}
            </div>

            <div className="space-y-3">
              {playgrounds.map((pg) => (
                <div key={pg.id} className="bg-surface-100 rounded-xl p-3 flex gap-3 hover:bg-surface-200 transition cursor-pointer">
                  <img src={pg.imageUrl} alt={pg.name} className="w-20 h-16 rounded-lg object-cover bg-surface-200" />
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white text-sm truncate">{pg.name}</h4>
                      <div className="flex items-center text-yellow-400 text-xs">
                        <StarIcon className="w-3 h-3 mr-0.5" filled />
                        {pg.rating}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 flex items-center truncate">
                      <MapPinIcon className="w-3 h-3 mr-1" />
                      {pg.address}
                    </p>
                  </div>
                </div>
              ))}
              {!loading && playgrounds.length === 0 && (
                <p className="text-xs text-gray-500 text-center py-2">No venues found nearby.</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3 mt-auto">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl bg-surface-100 text-gray-300 font-semibold hover:bg-surface-200 transition"
          >
            Keep Swiping
          </button>
          <button 
            onClick={onChat}
            className="flex-1 py-3.5 rounded-xl bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-400 transition flex items-center justify-center"
          >
            <MessageCircleIcon className="w-5 h-5 mr-2" />
            Chat Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default MatchSuccessModal;