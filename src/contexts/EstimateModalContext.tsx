import React, { useState, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EstimateModalContext, type EstimateModalContextType } from './EstimateModalContextDefinition';

interface EstimateModalProviderProps {
    children: ReactNode;
}

export const EstimateModalProvider: React.FC<EstimateModalProviderProps> = ({ children }) => {
    const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Auto-open modal when visiting /quote route
    useEffect(() => {
        if (location.pathname === '/quote') {
            setIsEstimateModalOpen(true);
        }
    }, [location.pathname]);

    const openEstimateModal = () => setIsEstimateModalOpen(true);
    const closeEstimateModal = () => {
        setIsEstimateModalOpen(false);
        // Navigate back to home if we're on the /quote route
        if (location.pathname === '/quote') {
            navigate('/', { replace: true });
        }
    };
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
