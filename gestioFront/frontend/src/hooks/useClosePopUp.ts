import { useCallback } from "react";
import type { ModalVisibility } from "../types/Modal";
export const useClosePopUp = ({setIsModalVisible,setModalType,onRefresh}: ModalVisibility) => {

    return useCallback(() => {
        setIsModalVisible(false);
        setModalType(null);
        onRefresh();
    }, [setIsModalVisible, setModalType, onRefresh]);
}