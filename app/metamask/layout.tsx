import { Boundary } from '@/ui/Boundary';
import MetamaskAuth from './MetamaskAuth';
import MetamaskContext from './MetamaskContext';

import React from 'react'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MetamaskContext>
      <div className="space-y-9">
        <Boundary>
          <MetamaskAuth/>
        </Boundary>
        <div>{children}</div>
      </div>
    </MetamaskContext>
  );
}
