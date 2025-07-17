import { useState } from "react";

const ImageUploadForm = () => {

    const [ file, setFile ] = useState<File>()

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    }

    const handleSubmit = () => {
        if (!file) {
            alert("No hay archivo seleccionado");
            return;
        }
    }

    return (
        <div>
            <form className="flex flex-col items-center justify-center w-full gap-4">
                
                <label
                    htmlFor="fileInput"
                    className="flex flex-col items-center justify-center w-full"
                >
                    <div className="flex flex-col items-center justify-center pt-7">
                        <p className="mt-2 text-sm font-medium text-blue-600 hover:underline hover:cursor-pointer">
                            Selecciona un archivo
                        </p>
                    </div>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFile}
                    className="mt-4 hover:cursor-pointer"
                />
                <button type="button" onClick={() => handleSubmit()} className="bg-amber-400 p-2 rounded-sm border-2 font-bold border-black hover:cursor-pointer"> Subir Archivo </button>
            </form>
        </div>
    )
}

export default ImageUploadForm;
