import React from 'react';
import { GamePost, User } from '../types';
import { MapPinIcon, UsersIcon, StarIcon } from './Icons';
import SportAvatar from './SportAvatar';

interface GameFeedProps {
  posts: GamePost[];
  currentUser: User;
  onJoin: (post: GamePost) => void;
}

const GameFeed: React.FC<GameFeedProps> = ({ posts, currentUser, onJoin }) => {
  
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center px-6">
        <div className="glass-card rounded-full p-6 mb-4">
            <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400">Loading games in your area...</p>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-4 px-4 space-y-4">
      {posts.map((post) => {
        const isFull = post.attendees.length >= post.totalSlots;
        const hasJoined = post.attendees.includes(currentUser.id);
        const isAuthor = post.author.id === currentUser.id;

        return (
          <div key={post.id} className="glass-card p-5 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {/* Animated Sport Avatar ONLY - No user PFP */}
                <div className="relative">
                  <SportAvatar sport={post.sport} className="w-14 h-14" />
                </div>
                
                <div className="ml-3">
                  <h3 className="font-bold text-white text-base leading-tight">{post.author.name}</h3>
                  <div className="flex items-center text-xs text-gray-400 mt-0.5">
                    <span>{post.area}</span>
                    <span className="mx-1.5">•</span>
                    <span>{new Date(post.postedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-white/5 px-2 py-1 rounded-lg">
                <StarIcon className="w-3 h-3 text-yellow-400 mr-1" filled />
                <span className="text-xs font-bold text-white">{post.author.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4 pl-1">
              <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-500/20 text-brand-300 text-xs font-bold rounded-lg border border-brand-500/20">
                {post.sport}
              </span>
              <span className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-medium rounded-lg flex items-center">
                <MapPinIcon className="w-3 h-3 mr-1" />
                {post.area}
              </span>
              <span className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-medium rounded-lg">
                {post.time}
              </span>
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center text-sm">
                <UsersIcon className={`w-4 h-4 mr-2 ${isFull ? 'text-red-400' : 'text-green-400'}`} />
                <span className={isFull ? 'text-red-300' : 'text-gray-300'}>
                  {post.attendees.length} / {post.totalSlots} joined
                </span>
              </div>

              {isAuthor ? (
                <button disabled className="px-5 py-2 rounded-xl bg-white/5 text-gray-400 text-sm font-medium cursor-default">
                  Your Post
                </button>
              ) : hasJoined ? (
                 <button disabled className="px-5 py-2 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-bold">
                  Joined ✓
                </button>
              ) : isFull ? (
                <button disabled className="px-5 py-2 rounded-xl bg-white/5 text-gray-500 text-sm font-medium cursor-not-allowed">
                  Full
                </button>
              ) : (
                <button 
                  onClick={() => onJoin(post)}
                  className="px-6 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-bold shadow-lg shadow-brand-500/20 transition-transform active:scale-95"
                >
                  Join Game
                </button>
              )}
            </div>

          </div>
        );
      })}
      
      <div className="h-20"></div> {/* Bottom spacer */}
    </div>
  );
};

export default GameFeed;