import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Activity = {
    id: string;
    name: string;
    url: string;
};

type ActivityFilesType = {
    addActivity: (activity: Activity) => void;
    addFile: (file: File) => void;
    DownloadFile: (index: number) => void;
    DeleteFile: (index: number) => void;
    DeleteActivity: (index: number) => void;
    activities: Activity[];
    files: File[];
    isAdmin: boolean;
};

const ActivityFilesContext = createContext<ActivityFilesType | undefined>(undefined);

export function ActivityFilesProvider({ children }: { children: ReactNode }) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedActivities = localStorage.getItem("activities");
        const storedFiles = localStorage.getItem("files");

        if (storedActivities) setActivities(JSON.parse(storedActivities));
        if (storedFiles) setFiles(JSON.parse(storedFiles));

        const currentUrl = window.location.href;
        setIsAdmin(currentUrl.includes("Admin"));
    }, []);

    useEffect(() => {
        localStorage.setItem("activities", JSON.stringify(activities));
        localStorage.setItem("files", JSON.stringify(files));
    }, [activities, files]);

    const addActivity = (newActivity: Activity) => {
        setActivities((prev) => [...prev, newActivity]);
    };

    const addFile = (newFile: File) => {
        setFiles((prev) => [...prev, newFile]);
    };

    const DownloadFile = (index: number) => {
        const file = files[index];
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const DeleteFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const DeleteActivity = (index: number) => {
        setActivities((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <ActivityFilesContext.Provider
            value={{ addActivity, addFile, DownloadFile, DeleteFile, DeleteActivity, activities, files, isAdmin }}
        >
            {children}
        </ActivityFilesContext.Provider>
    );
}

export const useActivitiesFilesContext = (): ActivityFilesType => {
    const context = useContext(ActivityFilesContext);
    if (!context) {
        throw new Error("useActivitiesFilesContext must be used within an ActivityFilesProvider");
    }
    return context;
};
