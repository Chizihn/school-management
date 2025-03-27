import { X } from "lucide-react";
import React, {
  useEffect,
  ReactNode,
  useState,
  useCallback,
  useRef,
} from "react";

interface CenterModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  showBackdrop?: boolean;
  title?: string;
}
const CenterModal: React.FC<CenterModalProps> = ({
  isOpen,
  setIsOpen,
  children,
  showBackdrop = true,
  title,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollPositionRef = useRef<number>(0);
  // Capture initial scroll position when modal opens
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      scrollPositionRef.current = window.scrollY;
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    // Start the closing animation
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);

      // Restore body styles
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Restore scroll position if needed
      if (typeof window !== "undefined") {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "instant" as ScrollBehavior,
        });
      }
    }, 300);
  }, [setIsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setIsVisible(true);

    // Store current scroll position
    if (typeof window !== "undefined") {
      scrollPositionRef.current = window.scrollY;
    }

    // Calculate scrollbar width
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Lock body without shifting content
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Compensate for scrollbar disappearance

    // Handle escape key press
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Clean up function
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);

      // Only reset body styles if closing through unmount
      if (isOpen) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        // Restore scroll position if needed
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: scrollPositionRef.current,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }
    };
  }, [isOpen, handleClose]);

  // Don't render anything if modal is not open
  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[1000] ${
          showBackdrop ? "bg-black/50 backdrop-blur-sm" : ""
        } transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        {/* Modal Content */}
        {/* Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl w-full max-h-screen h-full overflow-hidden lg:w-full lg:max-w-4xl lg:h-[95vh]l
          transition-all duration-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <div className="sticky top-0 right-0 z-10 flex justify-between items-center bg-white p-2 border-b border-gray-300">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
              {title}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className=" h-full w-full flex-1 overflow-auto ">
            {/* p-2 lg:p-6 pb-[4rem] lg:pb-0 */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default CenterModal;
