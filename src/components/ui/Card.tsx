interface Card {
    title: string;
    description: string;
    img?: string;
}

const Card: React.FC<Card> = ({title, description}) => {
    return (
        <div className="flex flex-col border justify-center items-center  ">
            <a href="">
                <div className="bg-sky-300 border-3 border-black rounded-2xl h-52 w-60 flex transition relative">
                <div className="absolute -top-8 -left-12 text-5xl bg-ppink px-5 py-1 z-10 shadow-card group-hover:shadow-hover transition rounded-t-2xl border-3 border-black rounded-bl-2xl rounded-br-sm"> <svg width="1em" height="1em" data-icon="paint">   <symbol id="ai:local:paint" viewBox="0 0 256 256"><path fill="currentColor" d="M224 28c-20.29 0-43.16 11.24-68 33.4-18.47 16.49-34.39 35.83-45 49.93A56 56 0 0 0 36 164c0 33.22-21.26 48-22.22 48.68A4 4 0 0 0 16 220h76a56 56 0 0 0 52.67-75c14.11-10.63 33.44-26.55 49.93-45C216.76 75.16 228 52.29 228 32a4 4 0 0 0-4-4M92 212H26.35C33.91 203.69 44 188.08 44 164a48 48 0 1 1 48 48m26.52-97.31c4.13-5.44 9.32-12 15.29-18.9a80.1 80.1 0 0 1 26.4 26.4c-6.94 6-13.46 11.16-18.9 15.29a56.3 56.3 0 0 0-22.79-22.79m47.77 2.14a88.2 88.2 0 0 0-27.12-27.12c21.83-24.28 52.09-51.08 80.65-53.53-2.45 28.56-29.25 58.82-53.53 80.65"></path></symbol><use href="#ai:local:paint"></use>  </svg> </div>
                    <div className="h-80 w-60 overflow-hidden relative rounded-2xl">
                        <img src="/mercedez.jpg" alt="producto1" width="315" height="377" loading="lazy" decoding="async" className="object-bottom absolute group-hover:scale-105 transition" />
                    </div>
                </div>
            </a>
        </div>
    )

}

export default Card