export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const BADGES: Badge[] = [
  {
    id: 'curious',
    name: '궁금해요 배지',
    description: 'AI 결과에 대해 궁금해하기 시작했어요.',
    icon: '🧐',
  },
  {
    id: 'why',
    name: '왜 그럴까 배지',
    description: 'AI 결과의 이유를 생각해 봤어요.',
    icon: '🔍',
  },
  {
    id: 'review',
    name: '다시 보기 배지',
    description: '한 번 더 살펴보는 태도를 보였어요.',
    icon: '👀',
  },
  {
    id: 'confirmed',
    name: '확인했어요 배지',
    description: '다른 정보도 확인하려는 똑똑한 선택!',
    icon: '✅',
  },
  {
    id: 'fair_usage',
    name: '공정하게 쓰기 배지',
    description: 'AI를 공정하게 쓰기 위한 바른 행동을 골랐어요.',
    icon: '⚖️',
  },
  {
    id: 'thinking_user',
    name: '생각하는 사용자 배지',
    description: '공정한 사용 방법을 스스로 점검했어요.',
    icon: '🧠',
  },
];

export type SectionId = 'intro' | 'examples' | 'explanation' | 'action' | 'evaluation' | 'completed';
