export interface GameInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  iconType: 'coc' | 'bgmi' | 'drdriving' | 'random';
  longDescription: string;
}

export interface FloatingElement {
  id: string;
  gameId: string;
  top: string;
  left: string;
  size: number;
  dur: string;
  delay: string;
}
