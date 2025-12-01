
import React from 'react';
import { SportType } from '../types';

interface SportAvatarProps {
  sport: SportType;
  className?: string;
}

const SportAvatar: React.FC<SportAvatarProps> = ({ sport, className }) => {
  const getAvatarContent = () => {
    switch (sport) {
      case SportType.FOOTBALL:
        return (
          <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden border-2 border-gray-200">
             <span className="text-3xl select-none filter drop-shadow-sm">⚽</span>
          </div>
        );
      case SportType.BASKETBALL:
        return (
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center relative overflow-hidden border-2 border-orange-800">
            <span className="text-3xl select-none filter drop-shadow-sm">🏀</span>
          </div>
        );
      case SportType.TENNIS:
      case SportType.PADEL:
        return (
          <div className="w-full h-full bg-gradient-to-br from-lime-300 to-lime-500 flex items-center justify-center relative overflow-hidden border-2 border-lime-600">
             <span className="text-3xl select-none filter drop-shadow-sm">🎾</span>
          </div>
        );
      case SportType.RUNNING:
        return (
          <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center relative overflow-hidden border-2 border-blue-300">
             <span className="text-3xl select-none filter drop-shadow-sm">👟</span>
          </div>
        );
      case SportType.GYM:
        return (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative overflow-hidden border-2 border-gray-600">
             <span className="text-3xl select-none filter drop-shadow-sm">🏋️</span>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-brand-500 flex items-center justify-center border-2 border-brand-400">
             <span className="text-3xl select-none">🏆</span>
          </div>
        );
    }
  };

  return (
    <div className={`rounded-full overflow-hidden shadow-lg ${className}`}>
      {getAvatarContent()}
    </div>
  );
};

export default SportAvatar;
