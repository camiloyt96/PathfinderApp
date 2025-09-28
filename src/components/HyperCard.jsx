export default function HyperCard(props) {
    return (    
        <a href="#"
        className="img-container text-decoration-none h-100 d-flex flex-column justify-content-end align-items-center"
        style={{
            backgroundImage: `${props.linearGradient}, url(${props.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: props.height
        }}
    >
            <div className="text-white mt-3 text-center">
            <h2>{props.text}</h2>
            
        </div>
    </a>

    )}