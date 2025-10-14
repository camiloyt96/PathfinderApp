import RegisterBox from './RegisterBox'
import backgroundImage from '../assets/mapa_login.jpg';
import Navbar from './Navbar';
import { Fragment } from 'react';



export default function RegisterPage() {
    return (
        <Fragment>
            <Navbar/>
            <section className="" style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150vh',
            marginTop: "-40px",
            }}>
                <RegisterBox/>
            </section>
        </Fragment>
    )
}