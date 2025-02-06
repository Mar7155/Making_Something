interface Card {
    title: string;
    description: string;
    img?: string;
}

const Card: React.FC<Card> = ({title, description}) => {
    return (
        <div className="flex flex-col">
            <img className="" src="" alt={title} />
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )

}

export default Card