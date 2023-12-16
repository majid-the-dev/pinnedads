import { create } from 'zustand';

interface useCampaignModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCampaignModal = create<useCampaignModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useCampaignModal;