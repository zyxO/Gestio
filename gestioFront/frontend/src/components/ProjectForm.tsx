import { postProject } from "../api/Projects";

interface ProjectFormProps {
    onClose: () => void;
    showBanner: () => void;
    setBannerNotificationMessage: (msg: string) => void;
}

const AddProject = ({ onClose,showBanner,setBannerNotificationMessage }: ProjectFormProps) => {
    async function handleSubmitProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            created_at: new Date()
        }
        try {
            await postProject(data);
            setBannerNotificationMessage('Project created successfully!');
            showBanner();
            onClose();
        } catch (error) {
            console.error('Error creating project:', error);
            setBannerNotificationMessage('Failed to create project. Please try again.');
            showBanner();
            onClose();
        }
    }
return (
    <form onSubmit={handleSubmitProject}>
        <div className="flex gap-2 items-center justify-center mb-4">        
            <label className="w-32 text-base" htmlFor="name">Project's name</label>
            <input
                className="text-base w-60 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='name'
                id='name'
                type='text'
                placeholder='project name'
                required
            />
        </div>
        <div className="flex gap-2 items-center justify-center">
            <label className="w-32 text-base" htmlFor="description">Description</label>
            <input
                className="text-base w-60 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='description'
                id='description'
                type='text'
                placeholder='description of the project'
                required
                />
        </div>
        <button type='submit'className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded">+ new project</button>
    </form>
    );
}
export default AddProject