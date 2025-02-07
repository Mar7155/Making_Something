interface button{
    text: string;
    color: string;
    href?: string;
}

const Button: React.FC<button> = ({text, color, href}) => {
    return (
        <a href={href} className={`px-6 py-2 text-black font-bold border ${color} border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition `}>
            {text}
        </a>
    )
}

export default Button