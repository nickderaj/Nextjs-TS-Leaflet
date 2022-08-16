import Button from '@/components/elements/buttons/Button';
import Modal from '@/components/elements/modals/Modal';
import Spinner from '@/components/elements/spinner/Spinner';
import { setSampleModalOpen } from '@/redux/slices/modalSlice';
import { useDispatch } from 'react-redux';

export interface ILogoutModalBody {
  isSubmitting: boolean;
  handleSubmit: (_e: React.FormEvent) => void;
}

export default function SampleModalBody({ isSubmitting, handleSubmit }: ILogoutModalBody) {
  const dispatch = useDispatch();

  return (
    <Modal>
      <div className="bg-neutral-50 z-50 rounded-md flex flex-col min-w-[330px] w-min h-min relative">
        {isSubmitting && (
          // Block any interaction with a loading spinner
          <div className="w-full h-full absolute rounded-md flex justify-center items-center backdrop-blur-[1.5px]">
            <Spinner />
          </div>
        )}
        <h4 className="text-base border-b py-3 px-6 mb-4">Sample Modal</h4>
        <form onSubmit={handleSubmit} className="px-6 pb-4 flex flex-col">
          <span>Are you sure you want to close this modal?</span>
          <div className="flex gap-2 my-4 justify-center items-center">
            <Button type="button" variant="secondary" title="CANCEL" onClick={() => dispatch(setSampleModalOpen(false))} />
            <Button type="submit" title="CLOSE" disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </Modal>
  );
}
