import Button from '@/components/elements/buttons/Button';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import { PageWithLayout } from '@/types/page';
import Link from 'next/link';

export default function Home(_: PageWithLayout) {
  return (
    <div className="flex gap-2 h-screen w-screen justify-center items-center">
      <Link href="/loki">
        <Button title="Loki" />
      </Link>
      <Link href="/jax">
        <Button title="Jax" />
      </Link>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
