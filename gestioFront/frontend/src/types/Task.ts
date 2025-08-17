export interface Task {
    "@id": string;
    "@type": string;
    id: number;
    name: string;
	iri: string;
    status: number;
    createdAt: string;
    userId: string;
    projectId: string;
    comments: string[];
    description: string;
}
export interface TaskColumnProps {
	status: number;
	tasks: Task[];
	title: string;
	onRefresh: () => void;
	showBanner: () => void;
	setBannerNotificationMessage: (msg: string) => void;
}
export interface CommentsType {
    id: number;
    description: string;
    userId: {
        username: string;
    };
    created_at: string;
}
export interface TasksFormProps {
    onClose: () => void;
    Task?: Task;
    showBanner: () => void;
    setBannerNotificationMessage: (msg: string) => void;
}