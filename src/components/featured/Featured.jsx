import "./featured.css";
import useFetch from "../../hooks/useFetch";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useNavigate } from "react-router-dom";

const Featured = () => { 
    const navigate = useNavigate();
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=Anuradhapura,Kandy,Matara")

    if(loading) return <LoadingAnimation />;
    if(error) return <div className="featured">Error loading data!</div>;
    if(!data) return <div className="featured">No data available</div>;

    const handleClick = (city) => {
        navigate(`/city/${city}`);
    };

    return(
        <div className="featured">
            <div className="featuredItem" onClick={() => handleClick('Anuradhapura')} style={{cursor: 'pointer'}}>
                <img src="https://duqjpivknq39s.cloudfront.net/2018/12/Ruwanveliseya-3-1024x768.jpg" alt="" className="featuredImage" />
                <div className="featuredTitles">
                    <h2>Anuradhapura</h2>
                    <h3>{data[0] || 0} properties</h3>
                </div>
            </div>
            <div className="featuredItem" onClick={() => handleClick('Kandy')} style={{cursor: 'pointer'}}>
                <img src="https://bhlankatours.com/wp-content/uploads/2024/01/temple-tooth-of-relic-820x520-1.jpg" alt="" className="featuredImage" />
                <div className="featuredTitles">
                    <h2>Kandy</h2>
                    <h3>{data[1] || 0} properties</h3>
                </div>
            </div>
            <div className="featuredItem" onClick={() => handleClick('Matara')} style={{cursor: 'pointer'}}>
                <img src="https://st5.depositphotos.com/19085394/64942/i/450/depositphotos_649425688-stock-photo-tissamaharama-stupa-sri-lanka.jpg" alt="" className="featuredImage" />
                <div className="featuredTitles">
                    <h2>Matara</h2>
                    <h3>{data[2] || 0} properties</h3>
                </div>
            </div>
        </div>
    )
}

export default Featured;