import React, { useState } from 'react';
import { SectionId } from '../types';

// --- Shared UI Components ---
const SectionContainer: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center px-6 py-10 relative scroll-mt-0 ${className}`}>
    {children}
  </section>
);

const PrimaryButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = "" }) => (
  <button 
    onClick={onClick}
    className={`w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all transform ${className}`}
  >
    {children}
  </button>
);

const ChatBubble: React.FC<{ text: string; align?: 'left' | 'right' }> = ({ text, align = 'left' }) => (
  <div className={`flex w-full mb-4 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed
      ${align === 'right' ? 'bg-indigo-100 text-indigo-900 rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
      {text}
    </div>
  </div>
);

// --- Sections ---

interface IntroSectionProps {
  onStart: () => void;
}
export const IntroSection: React.FC<IntroSectionProps> = ({ onStart }) => {
  return (
    <SectionContainer className="bg-gradient-to-b from-violet-50 to-white text-center">
      <div className="mb-2">
        <span className="inline-block px-3 py-1 bg-violet-200 text-violet-700 text-xs font-bold rounded-full">3분 마이크로러닝</span>
      </div>
      <h1 className="text-3xl font-black text-slate-800 mb-2 leading-tight">
        인공지능은<br />항상 공정할까?
      </h1>
      <p className="text-slate-500 font-medium mb-8">
        AI가 내린 결정, 정말 모두에게 공평할까?
      </p>

      {/* Mock Short-form Video Area */}
      <div className="relative w-full aspect-[9/16] max-h-[400px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mx-auto mb-8 group cursor-pointer">
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(https://picsum.photos/400/700?grayscale)' }}></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 ring-2 ring-white/50 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p className="text-white font-bold text-shadow px-6 text-center">
              🎬 3초 숏폼<br/>
              <span className="text-sm font-normal opacity-90">한 친구는 얼굴 인식이 잘 되고,<br/>다른 친구는 안 되는 장면</span>
            </p>
        </div>
      </div>

      <PrimaryButton onClick={onStart}>
        시작해 볼게요
      </PrimaryButton>
    </SectionContainer>
  );
};

interface ExamplesSectionProps {
  onMoreInfo: () => void;
  onReview?: () => void;
}
export const ExamplesSection: React.FC<ExamplesSectionProps> = ({ onMoreInfo, onReview }) => {
  return (
    <SectionContainer className="bg-white">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        AI는 왜 어떤 얼굴만<br/>잘 알아볼까?
      </h2>

      <div className="space-y-4 mb-8">
        <div className="bg-violet-50 p-5 rounded-2xl border border-violet-100 flex items-start gap-3">
          <div className="text-3xl">🤳</div>
          <div>
            <h3 className="font-bold text-violet-900 mb-1">얼굴 필터</h3>
            <p className="text-sm text-slate-600">"얼굴 필터가 밝은 피부만 잘 인식해요."</p>
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-start gap-3">
          <div className="text-3xl">🎮</div>
          <div>
            <h3 className="font-bold text-blue-900 mb-1">게임 추천</h3>
            <p className="text-sm text-slate-600">"게임 추천이 계속 비슷한 캐릭터만 골라줘요."</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl mb-8 border border-slate-100">
        <p className="text-center text-slate-600 text-sm font-medium">
          "AI도 사람처럼, 한쪽으로 치우친 데이터를 배웠다면 결과도 한쪽으로 치우칠 수 있어요."
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <PrimaryButton onClick={onMoreInfo}>
            왜 그런지 더 알아보기
        </PrimaryButton>
        {onReview && (
             <button 
             onClick={onReview} 
             className="w-full py-3 text-slate-400 text-sm font-medium hover:text-slate-600 underline"
           >
             다시 보기
           </button>
        )}
      </div>
    </SectionContainer>
  );
};

interface ExplanationSectionProps {
  onNext: () => void;
  onReview?: () => void;
}
export const ExplanationSection: React.FC<ExplanationSectionProps> = ({ onNext, onReview }) => {
  return (
    <SectionContainer className="bg-indigo-50">
      <div className="text-center mb-6">
        <span className="text-indigo-500 font-bold tracking-wider text-xs uppercase">Secret</span>
        <h2 className="text-2xl font-bold text-slate-800">AI가 불공정해지는 이유</h2>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-2 mb-8">
        <ChatBubble text="📸 한쪽 사람들 사진만 많이 배웠을 때 그럴 수 있어." align="left" />
        <ChatBubble text="🏫 특정 상황의 데이터만 모였을 때도 발생해." align="right" />
        <ChatBubble text="👩‍💻 검사하는 사람이 문제를 미리 눈치채지 못했을 때도 생기지." align="left" />
        
        <div className="mt-4 p-4 bg-white/80 backdrop-blur rounded-xl text-center border border-indigo-100">
            <p className="text-indigo-900 font-bold text-sm">
                "그래서 AI가 똑똑하다고 해도,<br/>항상 공평한 건 아니에요."
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button onClick={onNext} className="p-4 bg-white rounded-xl shadow-sm border border-indigo-100 text-indigo-700 font-bold hover:bg-indigo-50 transition-colors">
            🤔 AI 말을 그냥 믿어도 될까?
        </button>
        <button onClick={onNext} className="p-4 bg-white rounded-xl shadow-sm border border-indigo-100 text-indigo-700 font-bold hover:bg-indigo-50 transition-colors">
            🧐 한 번 더 생각해 보는 게 좋을까?
        </button>
        {onReview && (
          <button onClick={onReview} className="mt-2 text-xs text-slate-400 underline p-2">
            이전 내용 다시 보기
          </button>
        )}
      </div>
    </SectionContainer>
  );
};

interface ActionSectionProps {
  onSelect: (option: 'A' | 'B' | 'C') => void;
}

export const ActionSection: React.FC<ActionSectionProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<'A' | 'B' | 'C' | null>(null);

  const handleSelect = (opt: 'A' | 'B' | 'C') => {
    if (selected) return; // Prevent multi-click
    setSelected(opt);
    onSelect(opt);
  };

  const OptionCard = ({ type, text, feedback, icon, borderColor, feedbackColor }: any) => {
    const isSelected = selected === type;
    const isOtherSelected = selected && selected !== type;

    return (
      <div 
        onClick={() => handleSelect(type)}
        className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
          ${isSelected ? `${borderColor} bg-white scale-105 shadow-md z-10` : 'border-transparent bg-white shadow-sm hover:bg-slate-50'}
          ${isOtherSelected ? 'opacity-50 grayscale' : 'opacity-100'}
        `}
      >
        <div className="flex items-center gap-3">
           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${isSelected ? 'bg-slate-800' : 'bg-slate-200'}`}>
             {type}
           </div>
           <p className="text-slate-800 font-medium text-sm">{text}</p>
        </div>

        {isSelected && (
          <div className={`mt-3 pt-3 border-t ${feedbackColor} animate-fade-in`}>
            <p className={`text-sm font-bold flex items-center gap-2`}>
               <span>{icon}</span> {feedback}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <SectionContainer className="bg-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
            AI가 추천한 결과를 보기 전에,<br/>나는 어떤 행동을 할까?
        </h2>
        <p className="text-sm text-slate-500">카드를 눌러 선택해보세요.</p>
      </div>

      <div className="space-y-3 flex-1">
        <OptionCard 
            type="A" 
            text="AI가 말한 대로 무조건 믿는다."
            feedback="AI도 틀릴 수 있어요. 한 번 더 생각해 보는 게 좋아요."
            icon="⚠️"
            borderColor="border-red-400"
            feedbackColor="text-red-500 border-red-100"
        />
        <OptionCard 
            type="B" 
            text="누군가에게 불공평할 수 있는지 한 번 더 생각해 본다."
            feedback="좋아요! 공정한지를 먼저 떠올렸어요."
            icon="👍"
            borderColor="border-green-500"
            feedbackColor="text-green-600 border-green-100"
        />
        <OptionCard 
            type="C" 
            text="AI가 틀릴 수 있다고 보고 다른 정보도 함께 확인한다."
            feedback="아주 좋아요! AI 결과를 비판적으로 보는 태도예요."
            icon="⭐"
            borderColor="border-green-500"
            feedbackColor="text-green-600 border-green-100"
        />
      </div>

      {selected && (
          <div className="mt-6 p-4 bg-indigo-500 text-white rounded-xl text-center text-sm shadow-lg animate-fade-in">
              "AI는 똑똑하지만 완벽하지 않아요. 결과를 그대로 따르기 전에 한 번 더 생각하는 것이 공정한 사용의 시작입니다."
          </div>
      )}
    </SectionContainer>
  );
};

interface EvaluationSectionProps {
  onSubmit: () => void;
}
export const EvaluationSection: React.FC<EvaluationSectionProps> = ({ onSubmit }) => {
  const [q1, setQ1] = useState(3);
  const [q2, setQ2] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit();
  };

  if (submitted) {
     return (
        <SectionContainer className="bg-white text-center">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-6 animate-bounce">🎓</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">수고했어요!</h2>
                <p className="text-slate-600 mb-8">
                    오늘부터 나는<br/>
                    <strong className="text-indigo-600 text-xl">'생각하는 AI 사용자'</strong><br/>
                    입니다.
                </p>
                <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200 w-full mb-8">
                    <p className="font-bold text-yellow-800">🎖 생각하는 사용자 배지 획득!</p>
                </div>
                <p className="text-slate-400 text-sm">화면 우측 상단의 배지 아이콘을 눌러<br/>획득한 배지를 확인해보세요.</p>
            </div>
        </SectionContainer>
     )
  }

  const Slider = ({ label, val, setVal }: any) => (
      <div className="mb-8">
          <p className="font-bold text-slate-700 mb-4 text-sm">{label}</p>
          <div className="flex justify-between text-xs text-slate-400 mb-2 px-1">
              <span>전혀 아니다</span>
              <span>매우 그렇다</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
                <button
                    key={v}
                    onClick={() => setVal(v)}
                    className={`flex-1 aspect-square rounded-lg font-bold transition-all ${
                        val === v 
                        ? 'bg-indigo-500 text-white shadow-md scale-110' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                >
                    {v}
                </button>
            ))}
          </div>
      </div>
  )

  return (
    <SectionContainer className="bg-white">
      <h2 className="text-xl font-bold text-slate-800 mb-8 text-center">
        오늘 학습을 정리해볼까요?
      </h2>
      
      <Slider 
        label="1. AI가 불공정해질 수 있는 이유를 이해했다."
        val={q1} setVal={setQ1}
      />
      
      <Slider 
        label="2. 앞으로 AI 판단을 볼 때, 한 번 더 생각하고 확인할 것이다."
        val={q2} setVal={setQ2}
      />

      <div className="mt-auto">
        <PrimaryButton onClick={handleSubmit}>
            완료하고 배지 보기
        </PrimaryButton>
      </div>
    </SectionContainer>
  );
};