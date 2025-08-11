import React, { useState, type ReactNode } from 'react';
import { EstimateModalContext, type EstimateModalContextType } from './EstimateModalContextDefinition';

interface EstimateModalProviderProps {
    children: ReactNode;
}

export const EstimateModalProvider: React.FC<EstimateModalProviderProps> = ({ children }) => {
    const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);

    const openEstimateModal = () => setIsEstimateModalOpen(true);
    const closeEstimateModal = () => setIsEstimateModalOpen(false);
    const toggleEstimateModal = () => setIsEstimateModalOpen(prev => !prev);

    const value: EstimateModalContextType = {
        isEstimateModalOpen,
        openEstimateModal,
        closeEstimateModal,
        toggleEstimateModal,
    };

    return (
        <EstimateModalContext.Provider value={value}>
            {children}
        </EstimateModalContext.Provider>
    );
};
