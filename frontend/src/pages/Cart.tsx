import React from "react";
import { useGetUserCartQuery } from "@/feature/cart/cartApi";
import MainLayout from "../layouts/MainLayout";
import CTABtn from "../components/common/CTABtn"
import { PiArrowLeft, PiCross } from "react-icons/pi";

const Cart: React.FC = () => {
  const { data } = useGetUserCartQuery();

  console.log("DATA",data);
  return (
    <MainLayout>
      <div className="w-11/12 mx-auto min-h-screen flex flex-col gap-10">
        <div className="flex items-center justify-between pt-16">
            <h1 className="font-bold text-6xl">My Cart</h1>
            <div className="w-52"><CTABtn title="Continue Shopping" bg="black" text="white" icon={<PiArrowLeft size={25}/>}/></div>
        </div>
        <div>
            <div className="grid grid-cols-5">
                <div className="col-span-2">PRODUCT</div>
                <div className="">PRICE</div>
                <div className="">QTY</div>
                <div className="">TOTAL</div>
            </div>
            <div>
                {
                    data?.cart?.items?.map((item:any) => {
                        return (
                            <div key={item._id} className="border-t grid grid-cols-5 border-gray-200 py-4">
                                <div className="col-span-2 flex gap-2">
                                    <img className="w-20 h-20 aspect-square object-cover " src={item?.product?.images[0].url}/>
                                    <div>
                                        <h3 className="font-semibold text-lg">{item?.product?.name}</h3>
                                        <h3 className="font-mdtext-md">Color: {item?.product?.color}</h3>
                                        <h3 className="font-md text-md">Size: {item?.product?.size}</h3>
                                    </div>
                                </div>
                                <div className="flex font-semibold text-green-500 items-center">₹ {item?.product?.price}</div>
                                <div className="flex items-center">{item?.quantity}</div>
                                <div className="flex items-center justify-between mr-10">
                                   <div>₹ {item?.subtotal}</div>
                                   <div className="text-red-400 text-2xl">×</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
