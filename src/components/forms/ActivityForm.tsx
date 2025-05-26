import { useActivitiesFilesContext } from "@/contexts/ActivitiesFilesContext";
import { useState } from "react";

const ActivityForm = () => {

    const { addActivity } = useActivitiesFilesContext()
    const [activity, setActivity] = useState({
        id: '',
        name: '',
        url: ''
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const nombre = event.currentTarget.activity_name.value;
        const url = event.currentTarget.activity_url.value;

        const newActivity = {
            id: crypto.randomUUID(),
            name: nombre,
            url: url
        }
        setActivity(newActivity)

        if (!activity) {
            alert("No hay actividad");
            return;
        }
        addActivity(activity)

    }

    return (
        <div>
            <form onSubmit={handleSubmit} id="activity_form" className="flex flex-col items-center justify-center w-full gap-4">
                <label
                    htmlFor="activity_name"
                    className="flex flex-col items-center justify-center w-full"
                >
                    Nombre de la actividad
                </label>
                <input
                    type="text"
                    id="activity_name"
                    className="mt-4 hover:cursor-pointer border-1 border-black focus:border-blue-400"
                    required
                />
                <label
                    htmlFor="activity_url"
                    className="flex flex-col items-center justify-center w-full"
                >
                    url
                </label>
                <input
                    type="text"
                    id="activity_url"
                    className="mt-4 hover:cursor-pointer border-1 border-black focus:border-blue-400"
                    required
                />
                <button type="submit" className="bg-amber-400 p-2 rounded-sm border-2 font-bold border-black hover:cursor-pointer"> Subir Actividad </button>
            </form>
        </div>
    )
}

export default ActivityForm;
