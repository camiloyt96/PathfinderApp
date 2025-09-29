import { Fragment } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import NewsCards from "../components/NewsCards";

export default function Home(){
    return(
     <Fragment>
        <Navbar />
        <Hero />
        <NewsCards/>
     </Fragment>   
     

     
    )
}