import { create } from 'zustand';

interface useReviewModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useReviewModal = create<useReviewModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useReviewModal;