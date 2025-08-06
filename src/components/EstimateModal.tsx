import { Modal } from './Modal';

interface EstimateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EstimateModal = ({ isOpen, onClose }: EstimateModalProps) => {
    const yardBookUrl = 'https://www.yardbook.com/new_quote/5a5f72252b52b4a0797e828f1dadbdfc5c81b97c';

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Request Your Lawn Care Estimate"
            size="full"
        >
            <div className="h-[80vh] w-full">
                <iframe
                    src={yardBookUrl}
                    className="w-full h-full border-0 rounded-b-lg"
                    title="Lawn Care Estimate Request"
                    allow="fullscreen"
                    loading="lazy"
                />
            </div>
            
            {/* Fallback link in case iframe doesn't work */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">
                    Having trouble with the form above?
                </p>
                <a 
                    href={yardBookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                    Open in New Tab
                </a>
            </div>
        </Modal>
    );
};
