import { useEffect, type RefObject } from "react";

export const useCloseModal = (modalRef: RefObject<HTMLElement|null>,handler: () => void) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handler();
            }
        };
        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [modalRef, handler]);

    return modalRef;
}