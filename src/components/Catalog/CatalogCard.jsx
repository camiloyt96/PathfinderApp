import imgPath from '../../assets/Pathfinder GmCore.webp';

export default function CatalogCard() {
    return (
        <div className="card">
            <img src={imgPath} alt="" className='card-img-top' />
            <div className="card-body">

                <h5 className="card-title">This is a card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
}