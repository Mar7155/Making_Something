import FileUploadForm from './forms/FileUploadForm';
import { ActivityFilesProvider } from '@/contexts/ActivitiesFilesContext';
import GridActivityFiles from './gridActivityFiles';
import ActivityForm from './forms/ActivityForm';

const ActivityFiles = () => {

    return (
        <ActivityFilesProvider>
            <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 ">
                <div className='flex justify-between w-full'>
                    <FileUploadForm></FileUploadForm>
                    <ActivityForm></ActivityForm>
                </div>
                <GridActivityFiles></GridActivityFiles>
            </div>
        </ActivityFilesProvider>
    )
};

export default ActivityFiles;