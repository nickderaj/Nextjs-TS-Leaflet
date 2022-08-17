import Button from '@/components/elements/buttons/Button';
import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import Map from '@/components/map';
import { setDrawMode } from '@/redux/slices/drawSlice';
import { RootState } from '@/redux/store';
import { PageWithLayout } from '@/types/page';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

export default function Jax(_: PageWithLayout) {
  const { drawMode } = useSelector((state: RootState) => state.draw);
  const dispatch = useDispatch();

  return (
    <>
      <section className="h-screen w-screen flex">
        <div className="h-full w-full">
          <Map imageSrc="jax.jpg" />
        </div>
        <div className="w-3/12 flex flex-col justify-center items-center pt-16 gap-2 px-24 border-l border-l-indigo-500">
          <Button
            title="Rectangle"
            onClick={() => dispatch(setDrawMode('rectangle'))}
            variant={drawMode === 'rectangle' ? 'primary' : 'secondary'}
          />
          <Button
            title="Polygon"
            onClick={() => dispatch(setDrawMode('polygon'))}
            variant={drawMode === 'polygon' ? 'primary' : 'secondary'}
          />
          <Button
            title="Polyline"
            onClick={() => dispatch(setDrawMode('polyline'))}
            variant={drawMode === 'polyline' ? 'primary' : 'secondary'}
          />
          <Button
            title="Marker"
            onClick={() => dispatch(setDrawMode('marker'))}
            variant={drawMode === 'marker' ? 'primary' : 'secondary'}
          />
          <Button
            title="Circle"
            onClick={() => dispatch(setDrawMode('circle'))}
            variant={drawMode === 'circle' ? 'primary' : 'secondary'}
          />
          <div className="flex flex-col lg:flex-row gap-2 justify-center mt-24">
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
        </div>
      </section>
    </>
  );
}

Jax.getLayout = (page: React.ReactNode) => {
  return <PrimaryLayout title="Jax">{page}</PrimaryLayout>;
};
