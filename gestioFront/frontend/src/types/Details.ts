import type { Task } from "./Task";

export interface DetailsProps {
    DetailVisible:() => void;
    Task?: Task;
    showBanner: () => void;
    setBannerNotificationMessage: (msg: string) => void;
}