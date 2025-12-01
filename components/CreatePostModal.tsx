import React, { useState } from 'react';
import { SportType, Area, GamePost, User } from '../types';
import { XIcon, MapPinIcon } from './Icons';

interface CreatePostModalProps {
  user: User;
  onClose: () => void;
  onSubmit: (post: GamePost) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ user, onClose, onSubmit }) => {
  const [sport, setSport] = useState<SportType>(SportType.FOOTBALL);
  const [area, setArea] = useState<Area>(user.area as Area || Area.OLAYA);
  const [content, setContent] = useState('');
  const [slots, setSlots] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: GamePost = {
      id: `local_${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl || 'https://via.placeholder.com/150',
        rating: 5.0 // New users start high!
      },
      content,
      sport,
      area,
      time: "Now",
      totalSlots: slots,
      attendees: [user.id], // Auto join own game
      postedAt: Date.now()
    };

    onSubmit(newPost);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900/90 border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create Game Request</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-full">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">What are you playing?</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {Object.values(SportType).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSport(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    sport === s ? 'bg-brand-500 text-white' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Where?</label>
               <select 
                value={area}
                onChange={(e) => setArea(e.target.value as Area)}
                className="w-full p-3 bg-black/30 rounded-xl text-sm text-white border border-white/10 focus:border-brand-500 outline-none"
               >
                 {Object.values(Area).map(a => <option key={a} value={a}>{a}</option>)}
               </select>
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Total Players?</label>
               <input 
                 type="number" 
                 min="2" 
                 max="22" 
                 value={slots}
                 onChange={(e) => setSlots(parseInt(e.target.value))}
                 className="w-full p-3 bg-black/30 rounded-xl text-sm text-white border border-white/10 focus:border-brand-500 outline-none"
               />
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Details (Tweet style)</label>
             <textarea
               required
               maxLength={280}
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="e.g. Need a goalkeeper for a 5v5 match tonight at 8PM! Competitive level."
               className="w-full p-4 bg-black/30 rounded-xl text-sm text-white placeholder-gray-600 border border-white/10 focus:border-brand-500 outline-none h-28 resize-none"
             />
             <div className="text-right text-xs text-gray-600 mt-1">{content.length}/280</div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all"
          >
            Post Request
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
