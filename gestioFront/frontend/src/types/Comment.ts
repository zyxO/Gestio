export interface CommentProps {
	CloseAdd : () => void;
    userId: string | undefined,
    taskId: string | undefined,
    SubmittedComment : (comment:any) => void;
    showBanner: () => void;
    setBannerNotificationMessage: (msg: string) => void;
}