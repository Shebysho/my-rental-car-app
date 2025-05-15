import { Suspense, type ReactNode } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <PageHeader />
      <main>
        <Suspense fallback={<div>Loading page...</div>}>{children}</Suspense>
      </main>
    </>
  );
};

export default MainLayout;