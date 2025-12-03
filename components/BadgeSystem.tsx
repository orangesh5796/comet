import React from 'react';
import { Badge, BADGES } from '../types';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedBadges: Set<string>;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, earnedBadges }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl transform transition-all scale-100">
        <div className="bg-indigo-500 p-4 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">나의 배지 보관함</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {BADGES.map((badge) => {
              const isEarned = earnedBadges.has(badge.id);
              return (
                <div 
                  key={badge.id} 
                  className={`flex items-center p-3 rounded-xl border ${
                    isEarned ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100 opacity-60'
                  }`}
                >
                  <div className="text-3xl mr-3 filter drop-shadow-sm">
                    {isEarned ? badge.icon : '🔒'}
                  </div>
                  <div>
                    <div className={`font-bold ${isEarned ? 'text-indigo-900' : 'text-gray-400'}`}>
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-500 leading-tight mt-1">
                      {isEarned ? badge.description : '아직 획득하지 못했어요.'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 bg-gray-50 border-t text-center">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-indigo-500 text-white rounded-xl font-bold shadow-md active:scale-95 transition-transform"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

interface BadgeToastProps {
  badgeId: string | null;
  onClose: () => void;
}

export const BadgeToast: React.FC<BadgeToastProps> = ({ badgeId, onClose }) => {
  React.useEffect(() => {
    if (badgeId) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [badgeId, onClose]);

  if (!badgeId) return null;

  const badge = BADGES.find(b => b.id === badgeId);
  if (!badge) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in w-[90%] max-w-md">
      <div className="bg-white/95 backdrop-blur border-2 border-yellow-400 rounded-2xl shadow-xl p-4 flex items-center gap-3">
        <div className="text-4xl animate-pulse">{badge.icon}</div>
        <div className="flex-1">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">배지 획득!</p>
          <p className="font-bold text-slate-800">{badge.name}</p>
        </div>
      </div>
    </div>
  );
};