import { useEffect } from "react";

interface BannerNotificationProps {
    message: string,
    onClose: () => void;
}
const BannerNotification = ({message, onClose} : BannerNotificationProps) => {

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer); // Cleanup the timer on unmount or when the component is updated
  }, [onClose]);

  return(
    <div className="m-auto relative z-50">
        <div className="bg-white rounded-lg border-gray-300 border p-8 shadow-lg shadow-gray-500/50 w-96">
          <div className="flex flex-row">
            <div className="px-2">
              <svg width="24" height="24" viewBox="0 0 1792 1792" fill="#44C997" xmlns="http://www.w3.org/2000/svg">
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/>
                </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        </div>
        <button className="absolute right-2 top-2" onClick={onClose}>
          <svg className="fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
            <path
              className="heroicon-ui"
              d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
            />
          </svg>
        </button>
      </div>
  );
}
export default BannerNotification;