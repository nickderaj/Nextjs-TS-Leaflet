import Button from '@/components/elements/buttons/Button';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import { PageWithLayout } from '@/types/page';
import Link from 'next/link';

export default function Home(_: PageWithLayout) {
  return (
    <div className="flex gap-2 h-screen w-screen justify-center items-center">
      <Link href="/loki">
        <a>
          <Button title="Loki" />
        </a>
      </Link>
      <Link href="/jax">
        <a>
          <Button title="Jax" />
        </a>
      </Link>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
