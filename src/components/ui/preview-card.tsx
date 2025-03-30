interface Card {
    title: string;
    description: string;
    img?: string;
}

const Card: React.FC<Card> = ({ title, description }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <a href="/">
                <div className="relative bg-blue-300 border-3 rounded-2xl h-52 w-60 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                    <div className="absolute -top-8 -left-12 text-5xl bg-pink-300 px-5 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-t-2xl border-3 border-black rounded-bl-2xl rounded-br-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.41l-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83M12.83 20L4 11.17V4h7.17L20 12.83z"/><circle cx="6.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                    </div>
                    <div className="absolute w-full top-20 left-0 rounded-2xl hover:scale-105 transition">
                        <img src="/audi.png" alt="producto1" width="315" height="377" loading="lazy" decoding="async" className="object-bottom absolute group-hover:scale-105 transition" />
                    </div>
                    <button className="absolute -bottom-14 right-0 px-5 py-1 bg-amber-200 border-black border-3 rounded-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:cursor-pointer transition-shadow">
                        {title}
                    </button>
                </div>

            </a>
        </div>
    )

}

export default Card