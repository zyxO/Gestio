import { useNavigate } from "react-router-dom";
import { addComment } from "../api/Comment";
import type { CommentProps } from "../types/Comment";
function AddComment({ userId, taskId, ...props }: Readonly<CommentProps>) {
    const navigate = useNavigate();
    async function handleAddComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            description: formData.get('comment'),
            taskId: taskId,
            userId: userId,
            created_at: new Date()
        };
        try {
            const comment = await addComment(data);
            props.SubmittedComment(comment);
            props.showBanner();
            props.setBannerNotificationMessage('Comment added successfully');
            props.CloseAdd();
            return comment;
        } catch (error: any) {
            if (error instanceof Error) {
                console.error('Error adding comment:', error.message);
            } else if (error.status === 401) {
                navigate('/login');
            }
            props.showBanner();
            props.setBannerNotificationMessage('Failed to add comment');
        }
    }

    return (
        <div>
            <form onSubmit={handleAddComment}>
                <textarea id="comment" name="comment" placeholder="New comment" className="w-96 mb-2" rows={5} cols={40} required></textarea>
                <div className="flex gap-1">
                    <button className='bg-rose-500 hover:bg-rose-700 text-white font-extrabold py-2 px-4 border border-rose-700 rounded' onClick={props.CloseAdd}> Cancel </button>
                    <button type="submit" className='bg-emerald-500 hover:bg-emerald-700 text-white font-extrabold py-2 px-4 border border-emerald-700 flex-1 rounded'> ✔ </button>
                </div>
            </form>
        </div>
    );
}
export default AddComment;

