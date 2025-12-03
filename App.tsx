import React, { useState, useRef, useEffect } from 'react';
import { BadgeToast, BadgeModal } from './components/BadgeSystem';
import { IntroSection, ExamplesSection, ExplanationSection, ActionSection, EvaluationSection } from './components/ContentSections';
import { BADGES } from './types';

const App: React.FC = () => {
  // State
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set());
  const [toastBadgeId, setToastBadgeId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Refs for scrolling
  const introRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const evaluationRef = useRef<HTMLDivElement>(null);

  // Helper to scroll
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Badge Logic
  const unlockBadge = (id: string) => {
    if (!earnedBadges.has(id)) {
      setEarnedBadges(prev => new Set(prev).add(id));
      setToastBadgeId(id);
    }
  };

  // --- Handlers ---

  const handleStart = () => {
    unlockBadge('curious');
    scrollTo(examplesRef);
  };

  const handleMoreInfo = () => {
    unlockBadge('why');
    scrollTo(explanationRef);
  };

  // "Review" action triggers the review badge
  const handleReview = () => {
    unlockBadge('review');
    // Scroll back up to examples or explanation
    scrollTo(examplesRef); 
  };

  const handleExplanationNext = () => {
    // Spec says clicking either button moves to next section
    // and spec also says "Curious" badge for "Start", "Why" for explanation button... 
    // Spec Sec 3 says: "Student clicks any button -> Move to next. Trigger 'Curious' badge". 
    // WAIT, Spec Sec 1 says 'Curious' is for Start button. 
    // Spec Sec 3 says "Here allow getting 'Curious' badge". 
    // There might be a slight overlap in the prompt text. 
    // Given 'Curious' (궁금해요) is already awarded at Start (Sec 1), 
    // I will assume the prompt meant reinforcing it or maybe I misread.
    // Re-reading: "Here allow getting 'Curious' badge".
    // Actually, prompt Sec 3 says: "Here design to give 'Curious' badge". 
    // Prompt Sec 3 also says: "Start button -> 'Curious' badge" in Section 3 (Badge System summary).
    // Prompt Badge Summary: "Curious Badge - Acquired when clicking 'Start' in Intro". 
    // Okay, the Badge Summary is the source of truth.
    
    // So for Section 3 buttons, we just scroll.
    scrollTo(actionRef);
  };

  const handleActionSelect = (option: 'A' | 'B' | 'C') => {
    // Delay slightly to let user see feedback before auto-scrolling (optional) or just wait for them to scroll
    // The prompt implies immediate feedback. I will auto-scroll after a short delay.
    
    setTimeout(() => {
        if (option === 'C') {
            unlockBadge('confirmed'); // 확인했어요
            unlockBadge('fair_usage'); // 공정하게 쓰기
        } else if (option === 'B') {
            unlockBadge('fair_usage'); // 공정하게 쓰기
        }
        
        // Wait a bit more then scroll to evaluation
        setTimeout(() => {
            scrollTo(evaluationRef);
        }, 1500);
    }, 500);
  };

  const handleEvaluationSubmit = () => {
    unlockBadge('thinking_user');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
      {/* Header / Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4 pointer-events-none max-w-md mx-auto">
        <div className="flex justify-between items-start">
            <span className="text-[10px] text-slate-400 font-bold bg-white/80 px-2 py-1 rounded-full backdrop-blur">
                AI 공정성·편향 (3분)
            </span>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="pointer-events-auto bg-white/90 backdrop-blur p-2 rounded-full shadow-md border border-indigo-100 hover:scale-105 transition-transform active:scale-95"
            >
                <span className="text-xl">🎖</span>
                {earnedBadges.size > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {earnedBadges.size}
                    </span>
                )}
            </button>
        </div>
      </div>

      {/* Main Content Areas */}
      <div ref={introRef}>
        <IntroSection onStart={handleStart} />
      </div>
      
      <div ref={examplesRef}>
        <ExamplesSection onMoreInfo={handleMoreInfo} onReview={() => {
            // Self-review within section or trigger badge logic
            unlockBadge('review');
        }} />
      </div>

      <div ref={explanationRef}>
        <ExplanationSection onNext={handleExplanationNext} onReview={handleReview} />
      </div>

      <div ref={actionRef}>
        <ActionSection onSelect={handleActionSelect} />
      </div>

      <div ref={evaluationRef}>
        <EvaluationSection onSubmit={handleEvaluationSubmit} />
      </div>

      {/* Overlays */}
      <BadgeToast badgeId={toastBadgeId} onClose={() => setToastBadgeId(null)} />
      <BadgeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        earnedBadges={earnedBadges} 
      />
    </div>
  );
};

export default App;