import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

export type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
