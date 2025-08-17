import type { Dispatch, SetStateAction } from "react";
import type { Task } from "./Task";

export interface ModalTaskProps {
    onClose: () => void;
    Task?: Task;
    showBanner: () => void;
    setBannerNotificationMessage: (msg: string) => void;
}

export interface ModalVisibility {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    setModalType : Dispatch<SetStateAction<string | null>>;
    onRefresh: () => void;
}