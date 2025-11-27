import CatalogCard from "../components/Catalog/CatalogCard";
import CatalogFilter from "../components/Catalog/CatalogFilter";
import Navbar from "../components/Navbar";

export default function CatalogPage(){
    return(
        <div>
            <Navbar/>
            <div className="row">
                <div className="col-md-3 mt-4">
                    <CatalogFilter />
                </div>

                <div className="col-md-9 mb-4">
                    <div className="row mt-4">
                        <div className="col-md-4 mb-4">
                            <CatalogCard /> 
                        </div>
                        <div className="col-md-4 mb-4">
                            <CatalogCard />
                        </div>
                        <div className="col-md-4 mb-4">
                            <CatalogCard />
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}