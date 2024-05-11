"use client";

import { adminConfig } from '@/config/site-config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const segment = useSelectedLayoutSegment();

  return (
    <div className='p-4'>
      {adminConfig.sidebarNav.map((item) => (
        <Link
            href={`/admin/${item}`}
            className={cn(
            "group flex w-full items-center rounded border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
            item.includes(String(segment))
                // ? "bg-muted font-medium text-foreground"
                // : "text-muted-foreground",
            )}
        >
            <span className='capitalize'>{item}</span>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
