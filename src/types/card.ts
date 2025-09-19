export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
export type Rank = '7' | '8' | 'Q' | 'K' | '10' | 'A' | '9' | 'J';

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  color: 'red' | 'black';
  isPlayed: boolean;
}

export const SUITS: { [key in Suit]: { symbol: string; color: 'red' | 'black' } } = {
  spades: { symbol: '♠', color: 'black' },
  hearts: { symbol: '♥', color: 'red' },
  diamonds: { symbol: '♦', color: 'red' },
  clubs: { symbol: '♣', color: 'black' },
};

export const RANKS: Rank[] = ['7', '8', 'Q', 'K', '10', 'A', '9', 'J'];