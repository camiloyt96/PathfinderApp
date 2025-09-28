export default function CarouselHero(props) {
  return (
    <div className="carousel-item active" style={{
          backgroundImage: `url(${props.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: props.height
        }}>
                <div className="row h-100">
                  <div className="col text-center text-white d-flex flex-column justify-content-center align-items-center"
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%'}}>
              <h1 className="display-4 fw-bold">Welcome to Pathfinder</h1>
              <h3>Lead your Story</h3>
            </div>
          </div>
        </div>

  )}