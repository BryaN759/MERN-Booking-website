import { useEffect } from 'react';

type ToastProps = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles =
        type == 'SUCCESS'
            ? 'fixed bottom-4 right-4 z-50 p-4 rounded-md bg-gray-100 border border-green-600 text-green-600 max-w-md'
            : 'fixed bottom-4 right-4 z-50 p-4 rounded-md bg-gray-100 border border-red-600 text-red-600 max-w-md';
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
