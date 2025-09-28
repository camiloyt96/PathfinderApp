import heroImg from '../assets/hero.webp'
import heroImg2 from '../assets/Mapa mundis.png' 
import heroImg3 from '../assets/sand_bg.webp' 
import CarouselHero from './CarouselHero'
import '../css_modules/Hero.css'

export default function Hero() {
  return (
    <section className="hero h-100">    
      <div id="heroCarousel" className="mt-5 carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <CarouselHero img={heroImg2} height={'600px'}/>
          <CarouselHero img={heroImg} height={'600px'}/>
          <CarouselHero img={heroImg3} height={'600px'}/>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    
      
    </section>
  )
}