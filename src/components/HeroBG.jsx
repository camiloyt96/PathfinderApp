import LoginBox from "./LoginBox"
import backgroundImage from '../assets/mapa_login.jpg';



export default function HeroBG() {
    return (
        <section className="" style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          marginTop: "-40px",
        }}>
            <LoginBox/>
        </section>
    )
}