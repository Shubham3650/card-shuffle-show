import { motion } from 'framer-motion';
import { Card, SUITS } from '@/types/card';
import { cn } from '@/lib/utils';

interface PlayingCardProps {
  card: Card;
  onClick: () => void;
  className?: string;
}

export const PlayingCard = ({ card, onClick, className }: PlayingCardProps) => {
  const suit = SUITS[card.suit];
  const isRed = suit.color === 'red';
  
  return (
    <motion.div
      className={cn(
        "relative cursor-pointer select-none transition-all duration-300",
        "w-16 h-24 rounded-lg shadow-card hover:shadow-card-hover",
        "border border-border/20",
        card.isPlayed 
          ? "bg-card-played opacity-75 hover:opacity-90" 
          : "bg-card-active hover:scale-105 hover:shadow-glow",
        className
      )}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      layout
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-lg" />
      
      {/* Top rank and suit */}
      <div className="absolute top-1 left-1 flex flex-col items-center leading-none">
        <span 
          className={cn(
            "text-xs font-bold",
            isRed ? "text-card-red" : "text-card-black"
          )}
        >
          {card.rank}
        </span>
        <span 
          className={cn(
            "text-sm",
            isRed ? "text-card-red" : "text-card-black"
          )}
        >
          {suit.symbol}
        </span>
      </div>

      {/* Center suit symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className={cn(
            "text-2xl font-bold",
            isRed ? "text-card-red" : "text-card-black"
          )}
        >
          {suit.symbol}
        </span>
      </div>

      {/* Bottom rank and suit (rotated) */}
      <div className="absolute bottom-1 right-1 flex flex-col items-center leading-none rotate-180">
        <span 
          className={cn(
            "text-xs font-bold",
            isRed ? "text-card-red" : "text-card-black"
          )}
        >
          {card.rank}
        </span>
        <span 
          className={cn(
            "text-sm",
            isRed ? "text-card-red" : "text-card-black"
          )}
        >
          {suit.symbol}
        </span>
      </div>

      {/* Hover glow effect */}
      {!card.isPlayed && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
};