import Button from '@/components/elements/buttons/Button';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import SampleModal from '@/components/modals/SampleModal';
import { setSampleModalOpen } from '@/redux/slices/modalSlice';
import { PageWithLayout } from '@/types/page';
import { useDispatch } from 'react-redux';

export default function Home(_: PageWithLayout) {
  const dispatch = useDispatch();

  return (
    <>
      <section className="flex justify-center items-center h-screen w-screen">
        <Button onClick={() => dispatch(setSampleModalOpen(true))} title="OPEN MODAL" />
      </section>
      <SampleModal />
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Home Page">{page}</PrimaryLayout>;
};
