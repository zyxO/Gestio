import { useCallback, useEffect, useRef, useState } from 'react';
import AddComment from './AddComment';
import { useComments } from '../hooks/useComments';
import { useGetProjectById } from '../hooks/useGetProjectById';
import { deleteComment } from '../api/Comment';
import type { DetailsProps } from '../types/Details';
import { useCloseModal } from '../hooks/useCloseModal';
import type { CommentsType } from '../types/Task';

const Details = ({Task,...props} : DetailsProps) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [addComment, setAddComment] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const { comments, setComments } = useComments(Task);
	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true);
		}, 10);
		return () => clearTimeout(timer);
	}, [Task]);
	
	const handleClose = useCallback(() => {
	setVisible(false);
	setTimeout(()=>{
		props.DetailVisible();
	},500)
	}, [props]);

	const AddSubmittedCommentInTask = (newComments: CommentsType) => {
		setComments([...comments,newComments]);
	}

	const removeCommentInTask = (removeCommentIndex: number) => {
		const filteredComment = comments.filter(item => item.id !== removeCommentIndex);
		setComments(filteredComment);
	}

	const project = useGetProjectById(Task);

	const handleAddComment = () => {
		setAddComment(true);
	}
	const closeAddComment = () => {
		setAddComment(false);
	}
	useCloseModal(modalRef,handleClose);
	const handleDeleteComment = async (id: number) => {
		try {
			const res = await deleteComment(id);
			if (res.status === 204) {
				removeCommentInTask(id);
				props.showBanner();
				props.setBannerNotificationMessage('Commentaire supprimé avec succès');
			} else {
				props.showBanner();
				props.setBannerNotificationMessage('Commentaire non supprimé avec succès');
				return;
			}
		} catch (error) {
			console.error('Error deleting comment:', error);
			props.setBannerNotificationMessage("Failed to delete comment");
		}
	}
	return (
		<div className='h-screen overflow-auto no-scrollbar' ref={modalRef}>
			<div className={"absolute bg-stone-100 z-40 inset-y-0 right-0 overflow-auto no-scrollbar transform transition-transform duration-500 ease w-100 shadow-gray-500 shadow-xl "+ (visible ?  'translate-x-0 ' :'translate-x-full'  )}>
				<div className='relative'>
					<div className='sticky top-0 right-0 z-50'>
					<button className="bg-red-300 bg-opacity-50 py-1 px-2 hover:bg-red-500 hover:transition-all hover:bg-opacity-70 text-sm mr-0 w-100" onClick={handleClose}>
						&#10005;
					</button>  
					</div>
					<div className='h-12'></div>
					<div className="flex flex-wrap justify-center items-center gap-4">
						<div className='flex-auto w-64 p-4'>
							<p className='font-bold'>Task's name : </p>
							<p className='italic'>{Task?.name}</p>
						</div>
						<div className='flex-auto w-64 p-4'>
							<p className='font-bold'>Task's description : </p>
							<p className='italic'>{Task?.description}</p>
						</div>
						<div className='flex-auto w-64 p-4'>
							<p className='font-bold'>Project's name of the task : </p>
							<p className='italic'>{project?.name}</p>
						</div>
						
						{comments.map((d) => {
							return (
							<div key={d.id} className='container max-w-3xl mx-auto p-4 min-h-0'>
								<div className="box box-content border-1 border-sky-300/90 p-8 relative inset-shadow-sm inset-shadow-sky-300/20 bg-sky-200/20 rounded text-clip">
									<button
									className=" absolute top-1 right-1 bg-red-300 bg-opacity-50 py-1 px-2 hover:bg-red-500 hover:bg-opacity-70 transition-all rounded-full text-sm"
									onClick={() => handleDeleteComment(d.id)}
									aria-label="Delete comment"
									>
									&#10005;
									</button>
									<div className='text-gray-800'>{d.description}</div>
									<div className='absolute right-2 bottom-0 text-sm italic'>{d.userId?.username} {new Date(d.created_at).toLocaleString([], {hour: '2-digit',minute: '2-digit',})}</div>
								</div>
							</div>
							);
						})}
					</div>
					
				</div>
				<div className="sticky bottom-0 bg-stone-100 w-full z-10 border-gray-300">
				{addComment ? (
					<AddComment taskId={Task?.iri} userId={Task?.userId} SubmittedComment={AddSubmittedCommentInTask} showBanner={props.showBanner} setBannerNotificationMessage={props.setBannerNotificationMessage} CloseAdd={closeAddComment} />
				) : (
					<button className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 w-full font-extrabold" onClick={handleAddComment}>+ comment</button>
				)}
				</div>
			</div>
		</div>
		
	);
}
export default Details;