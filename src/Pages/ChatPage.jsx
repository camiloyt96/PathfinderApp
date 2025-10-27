import Navbar from "../components/Navbar"
import ChatCard from "../components/Chat/ChatCard"


export default function ChatPage() {
    return (
        <div>
        <Navbar/>
            <div className="container-lg">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                    <ChatCard/> 
                    <div className="accordion mt-2 " id="accordionExample">
                        <div className="accordion-item bg-dark">
                            <h2 className="accordion-header">
                            <button className="accordion-button bg-dark text-white fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Como lanzar Dados?
                            </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body text-white fs-4">
                                <p>Para lanzar dados escribe /roll [número de dados]d[número de caras]
                                <br/>
                                <p>Ejemplo: /roll 2d6</p>
                                </p>
                            </div>
                            </div>
                        </div>
                        
  
                    </div> 
                </div>
            </div>
            
             
        </div>
        </div>
        
    )
}