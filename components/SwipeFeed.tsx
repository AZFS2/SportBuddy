import React, { useRef } from 'react';
import { BuddyProfile } from '../types';
import { MapPinIcon, HeartIcon, XIcon, StarIcon } from './Icons';

interface SwipeFeedProps {
  profiles: BuddyProfile[];
  onLike: (profile: BuddyProfile) => void;
  onPass: (profile: BuddyProfile) => void;
}

const SwipeFeed: React.FC<SwipeFeedProps> = ({ profiles, onLike, onPass }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToNext = (index: number) => {
    if (scrollContainerRef.current) {
      const nextPos = (index + 1) * scrollContainerRef.current.clientHeight;
      scrollContainerRef.current.scrollTo({ top: nextPos, behavior: 'smooth' });
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-400">
        <div className="glass-card rounded-full p-6 mb-4">
            <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p>Finding sports buddies in your area...</p>
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
    >
      {profiles.map((profile, index) => (
        <div 
          key={profile.id} 
          className="h-full w-full snap-start relative flex flex-col p-4 pb-24"
        >
          {/* Main Card Container */}
          <div className="relative flex-1 w-full rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
            
            {/* Image Background */}
            <div className="absolute inset-0">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-32" />
            </div>

            {/* Match Percentage Badge */}
            <div className="absolute top-6 right-6 z-20">
              <div className={`
                flex flex-col items-center justify-center w-16 h-16 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg
                ${profile.matchPercentage >= 80 ? 'bg-brand-500/80 text-white' : 'bg-black/50 text-gray-200'}
              `}>
                <span className="text-lg font-bold">{profile.matchPercentage}%</span>
                <span className="text-[8px] uppercase tracking-widest opacity-80">Match</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 z-10 flex flex-col">
              
              {/* Chips */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 bg-brand-500 text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-lg shadow-brand-500/30">
                  {profile.sport}
                </span>
                <span className="px-3 py-1 glass-card text-white text-xs font-medium rounded-full">
                  {profile.level}
                </span>
                <div className="flex items-center space-x-1 px-2 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                  <StarIcon className="w-3 h-3 text-yellow-400" filled />
                  <span className="text-xs font-bold text-yellow-400">{profile.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-sm">{profile.name}, {profile.age}</h2>
              
              <div className="flex items-center text-gray-300 text-sm font-medium mb-3">
                <MapPinIcon className="w-4 h-4 mr-1 text-brand-400" />
                {profile.area}
                <span className="mx-2">•</span>
                 <div className="flex gap-1">
                   {profile.availableDays.map(day => (
                     <span key={day} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded border border-white/5">
                       {day}
                     </span>
                   ))}
                 </div>
              </div>

              <p className="text-gray-200 text-base leading-relaxed mb-6 line-clamp-3 opacity-90">
                "{profile.bio}"
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    onPass(profile);
                    scrollToNext(index);
                  }}
                  className="flex-1 py-4 rounded-2xl glass-card hover:bg-white/10 border border-white/20 text-white font-semibold transition-all flex items-center justify-center group"
                >
                  <XIcon className="w-6 h-6 mr-2 text-gray-300 group-hover:text-white transition-colors" />
                  Skip
                </button>
                <button 
                  onClick={() => {
                    onLike(profile);
                    scrollToNext(index);
                  }}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all flex items-center justify-center border border-brand-400/20 transform active:scale-95"
                >
                  <HeartIcon className="w-6 h-6 mr-2 filled" filled />
                  Like
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
      
      {/* End of feed indicator */}
      <div className="h-full w-full snap-start flex items-center justify-center">
        <div className="text-center glass-card p-8 rounded-3xl mx-6">
          <p className="text-xl font-bold mb-2">You've reached the end</p>
          <p className="text-sm text-gray-400">Check back later for more potential matches in your area.</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeFeed;