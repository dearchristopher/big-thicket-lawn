import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'lg' }: ModalProps) => {
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-[95vw]'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative bg-white rounded-lg shadow-2xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] flex flex-col`}>
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                )}

                {/* Close button when no title */}
                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-md"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                )}

                {/* Body */}
                <div className="flex-1 overflow-auto rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};
