import { useContext } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const {user} = useContext(AuthContext);
    const detailsData = useLoaderData();
    const { _id, image, name, brand, type, price, rating, short_description, specialties} = detailsData;
    
    const handleAddToCart = () => {
        const cartInfo = {
            orderedBy: user.email,
            image: detailsData.image,
            name: detailsData.name,
            brand: detailsData.brand,
            type: detailsData.type,
            price: detailsData.price,
            rating: detailsData.rating
        };
       
        fetch("https://b8a10-brandshop-server-side-abusayed0.vercel.app/carts", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                toast.success("Added to cart!")
            }
        })

    };

    console.log(detailsData);
    return (
        <div className="mt-20 flex gap-10  flex-col md:flex-row border p-2">
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">

                <img className="absolute h-full w-full" src={image} alt="" />
            </div>
            <div className="w-full md:w-1/2">
                <div className="flex flex-col gap-2 ">
                    <h2 className="text-3xl font-semibold">{name}</h2>
                    <p className="text-xl">{short_description}</p>
                    <h5 className="text-xl font-medium">Brand : {brand}</h5>
                    <p className="text-xl">Type : {type}</p>
                    <h4 className="text-2xl">Price : {price} $</h4>
                    <p className="text-xl">Rating : {rating}</p>
                </div>
                <div className="mt-6 ">
                    <h3 className="text-2xl font-semibold">Qualities</h3>
                    {
                        specialties?

                            <ul className="mt-2 flex flex-col gap-1 ps-4">
                                {
                                    specialties.map((speciality, index) => <li key={index} className="flex gap-1 items-center">
                                        <AiFillCheckCircle className="text-2xl flex-shrink-0" />
                                        <span className="text-xl">{speciality}</span>
                                    </li>
                                    )
                                }
                            </ul>
                            :
                            <p className="mt-2 ps-4 text-xl">Not available</p>
                    }
                </div>
                <button onClick={handleAddToCart} className="mt-5 px-4 py-2 font-medium text-white bg-[#9A3B3B]">Add To Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;