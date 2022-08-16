import { setSampleModalOpen } from '@/redux/slices/modalSlice';
import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SampleModalBody from '../elements/modals/SampleModalBody';

export default function SampleModal() {
  const { sampleModalOpen } = useSelector((state: RootState) => state.modal);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    dispatch(setSampleModalOpen(false));
    setIsSubmitting(false);
  };

  return <>{sampleModalOpen && <SampleModalBody handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}</>;
}
