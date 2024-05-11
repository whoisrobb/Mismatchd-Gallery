import { cn } from '@/lib/utils';
import React from 'react';

interface StoreCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string,
    description: string
}

const StoreCard = ({ name, description, className }: StoreCardProps) => {
    return (
      <div className={cn('border rounded p-2 flex flex-col justify-end text-right hover:bg-secondary transition-colors', className)}>
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{description}</p>
      </div>
    )
  }
  
  export default StoreCard;