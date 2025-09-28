import imgCard1 from '../assets/Flameskull_AFR.webp' 
import imgCard2 from '../assets/high_reward_party.webp'  
import HyperCard from './HyperCard'


export default function NewsCards() {
  return (
    <section className="news-cards my-5">
        <div className="container-lg">
            <div className="row g-4 d-flex justify-content-center">
                <div className="col-md-5">
                    <HyperCard
                    img={imgCard1} 
                    height={'400px'}
                    linearGradient={"linear-gradient(0deg,rgba(191, 0, 0, 1) 0%, rgba(191, 0, 0, 0.4) 25%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(253, 187, 45, 1) 100%)"}
                    text={"New Adventure Paths Released! Explore the latest storylines and embark on epic quests in our newly launched Adventure Paths."}/>
                </div>
                <div className="col-md-5">
                    <HyperCard 
                    img={imgCard2}
                    height={'400px'}
                    linearGradient={"linear-gradient(0deg,rgba(191, 0, 0, 1) 0%, rgba(191, 0, 0, 0.4) 25%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(253, 187, 45, 1) 100%)"}
                    text={"New Adventure Paths Released! Explore the latest storylines and embark on epic quests in our newly launched Adventure Paths."}/>
                </div>
             </div>
        </div>
    </section>

  )
}