import React from 'react';

interface ProfileReadyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileReadyPopup: React.FC<ProfileReadyPopupProps> = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  // Effect to scroll to top when the popup is closed.
  const prevIsOpen = React.useRef(isOpen);
  React.useEffect(() => {
    if (prevIsOpen.current && !isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      {/* Main popup container: fixed dimensions, border, shadow, and flex column layout */}
      <div
        className="shadow-xl text-center rounded-none overflow-hidden border-2 border-black flex flex-col bg-white"
        style={{ width: '342px', height: '227px' }}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header section */}
        <div className="bg-[#333333] text-white flex items-center justify-center px-6" style={{ height: '77px' }}>
          <h2 className="text-[24px]">השאלון נשלח בהצלחה</h2>
        </div>
        {/* Body section */}
        <div className="flex items-center justify-center p-6 bg-white" style={{ height: '150px' }}>
          <p className="text-[#333333] text-[18px] font-bold">
            אנא המתן
          </p>
        </div>
      </div>
    </div>
  );
};

// Basic styling for the button if you uncomment it:
// Ensure you have a Button component or use standard HTML button with Tailwind classes.
// If using a custom Button component, import it:
// import { Button } from './button'; // Adjust path as needed

// Example for a simple close button if you decide to add one:
/*
<button
  onClick={onClose}
  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
>
  &times;
</button>
*/
