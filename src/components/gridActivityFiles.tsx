import { useActivitiesFilesContext } from "@/contexts/ActivitiesFilesContext";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { File } from "lucide-react";

const gridActivityFiles = () => {

    const { files, activities, DownloadFile, DeleteFile, DeleteActivity, isAdmin } = useActivitiesFilesContext()

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold"> Archivos </h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {files.map((file, index) => (
                    <Card key={index} className="flex justify-center items-center p-8">
                        <CardTitle className="text-sm font-medium text-gray-700">{file.name}{file.type}</CardTitle>
                        <CardContent>
                            <File></File>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <button onClick={() => DownloadFile(index)} className="bg-green-400 p-2 rounded-sm border-2 font-bold border-black hover:cursor-pointer">
                                Descargar
                            </button>
                            {isAdmin && (
                                <button onClick={() => DeleteFile(index)} className="bg-red-400 p-2 rounded-sm border-2 font-bold border-black hover:cursor-pointer">
                                    Eliminar
                                </button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <h1 className="text-2xl font-bold"> Actividades </h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {activities.map((activity, index) => (
                    <Card key={index} className="flex justify-center items-center p-8">
                        <CardTitle>{activity.name}</CardTitle>
                        <CardContent>
                            <a className="mt-2 text-sm font-medium text-blue-600 hover:underline hover:cursor-pointer" href={activity.url}>Click Aquí</a>
                        </CardContent>
                        <CardFooter>
                            {isAdmin && (
                                <button onClick={() => DeleteActivity(index)} className="bg-red-400 p-2 rounded-sm border-2 font-bold border-black hover:cursor-pointer">
                                Eliminar
                                </button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default gridActivityFiles;