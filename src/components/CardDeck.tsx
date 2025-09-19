import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, Suit } from '@/types/card';
import { createDeck, getCardsBySuit } from '@/utils/deck';
import { SuitRow } from './SuitRow';
import { cn } from '@/lib/utils';

const SUIT_ORDER: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];

export const CardDeck = () => {
  const [cards, setCards] = useState<Card[]>(createDeck());

  const handleCardClick = (clickedCard: Card) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === clickedCard.id 
          ? { ...card, isPlayed: !card.isPlayed }
          : card
      )
    );
  };

  const activeCards = cards.filter(card => !card.isPlayed);
  const playedCards = cards.filter(card => card.isPlayed);

  const resetDeck = () => {
    setCards(createDeck());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground">
            Playing Card Deck
          </h1>
          <p className="text-muted-foreground text-lg">
            Click any card to move it between active and played sections
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>Active: {activeCards.length}</span>
            <span>•</span>
            <span>Played: {playedCards.length}</span>
            <span>•</span>
            <button 
              onClick={resetDeck}
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Reset Deck
            </button>
          </div>
        </motion.div>

        {/* Active Cards Section */}
        <motion.section 
          className={cn(
            "space-y-4 p-6 rounded-2xl",
            "bg-gradient-to-br from-primary/5 to-primary/10",
            "border border-primary/20"
          )}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-primary rounded-full animate-glow-pulse" />
            <h2 className="text-2xl font-bold text-foreground">
              Active Cards
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div className="space-y-4" layout>
              {SUIT_ORDER.map(suit => {
                const suitCards = getCardsBySuit(activeCards, suit);
                return (
                  <SuitRow
                    key={`active-${suit}`}
                    suit={suit}
                    cards={suitCards}
                    title="Active"
                    onCardClick={handleCardClick}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Played Cards Section */}
        <motion.section 
          className={cn(
            "space-y-4 p-6 rounded-2xl",
            "bg-gradient-to-br from-muted/10 to-muted/5",
            "border border-muted/30"
          )}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-muted-foreground/50 rounded-full" />
            <h2 className="text-2xl font-bold text-foreground">
              Played Cards
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/50 to-transparent" />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div className="space-y-4" layout>
              {SUIT_ORDER.map(suit => {
                const suitCards = getCardsBySuit(playedCards, suit);
                return (
                  <SuitRow
                    key={`played-${suit}`}
                    suit={suit}
                    cards={suitCards}
                    title="Played"
                    onCardClick={handleCardClick}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
};