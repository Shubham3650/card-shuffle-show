import { Card, SUITS, RANKS, Suit } from '@/types/card';

export function createDeck(): Card[] {
  const deck: Card[] = [];
  
  Object.entries(SUITS).forEach(([suit, { color }]) => {
    RANKS.forEach((rank) => {
      deck.push({
        id: `${suit}-${rank}`,
        suit: suit as Suit,
        rank,
        color,
        isPlayed: false,
      });
    });
  });
  
  return deck;
}

export function getCardsBySuit(cards: Card[], suit: Suit): Card[] {
  return cards
    .filter(card => card.suit === suit)
    .sort((a, b) => RANKS.indexOf(a.rank) - RANKS.indexOf(b.rank));
}