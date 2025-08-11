import { createContext } from 'react';

export interface EstimateModalContextType {
    isEstimateModalOpen: boolean;
    openEstimateModal: () => void;
    closeEstimateModal: () => void;
    toggleEstimateModal: () => void;
}

export const EstimateModalContext = createContext<EstimateModalContextType | undefined>(undefined);
