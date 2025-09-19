import { motion } from 'framer-motion';
import { Card, SUITS, Suit } from '@/types/card';
import { PlayingCard } from './PlayingCard';
import { cn } from '@/lib/utils';

interface SuitRowProps {
  suit: Suit;
  cards: Card[];
  title: string;
  onCardClick: (card: Card) => void;
  className?: string;
}

export const SuitRow = ({ suit, cards, title, onCardClick, className }: SuitRowProps) => {
  const suitInfo = SUITS[suit];
  const isEmpty = cards.length === 0;

  return (
    <motion.div
      className={cn(
        "relative p-4 rounded-xl",
        "bg-gradient-to-r from-muted/30 to-muted/10",
        "border border-border/30",
        isEmpty && "opacity-50",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Suit header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span 
            className={cn(
              "text-2xl",
              suitInfo.color === 'red' ? "text-card-red" : "text-card-black"
            )}
          >
            {suitInfo.symbol}
          </span>
          <h3 className="text-lg font-semibold text-foreground capitalize">
            {title} {suit}
          </h3>
        </div>
        <div className="flex-1 h-px bg-border/20" />
        <span className="text-sm text-muted-foreground">
          {cards.length} cards
        </span>
      </div>

      {/* Cards grid */}
      <motion.div 
        className="flex flex-wrap gap-2 min-h-[6rem]"
        layout
      >
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            No cards in {title.toLowerCase()}
          </div>
        ) : (
          cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              <PlayingCard 
                card={card} 
                onClick={() => onCardClick(card)}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};