import { useContext } from 'react';
import { EstimateModalContext } from '../contexts/EstimateModalContextDefinition';

export const useEstimateModal = () => {
    const context = useContext(EstimateModalContext);
    if (context === undefined) {
        throw new Error('useEstimateModal must be used within an EstimateModalProvider');
    }
    return context;
};
