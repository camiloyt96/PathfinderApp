import Navbar from "../components/Navbar"
import ChatCard from "../components/Chat/ChatCard"
import QrCode from "../components/QR/QrCode"
import backgroundImage from '../assets/background_perfil.jpg';
import AcordionHelper from "../components/AcordionHelper";


export default function ChatPage() {
    return (
        <div>
        <Navbar/>
        <section style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    
                    }}>
            <div className="container-lg">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                    <ChatCard/> 
                    <AcordionHelper/>
                </div>
                <div className="col-md-6">
                    <QrCode/>
                </div>
            </div>
            
             
        </div>
        </section>
            
        </div>
        
    )
}