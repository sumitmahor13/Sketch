import { useGetUserCartQuery } from "@/feature/cart/cartApi";
import React from "react";

const Cart: React.FC = () => {
    const {data} = useGetUserCartQuery();

    console.log(data?.cartItem)
    return(
        <div>
            {data?.cartItem.map((item:any) => (
                <div>
                    <h1>{item.product.name}</h1>
                    <div>
                        {item.product.images.map((imge) => (
                            <img className="w-42" src={imge.url}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cart;