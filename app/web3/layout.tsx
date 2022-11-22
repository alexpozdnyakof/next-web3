import { Boundary } from '@/ui/Boundary';
import Contract from './Contract';
import React from 'react'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-9">
      <Boundary>
        <Contract/>
      </Boundary>
      <div>{children}</div>
    </div>
  );
}
