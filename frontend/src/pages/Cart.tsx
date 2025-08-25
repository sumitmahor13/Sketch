import React from "react";
import { useGetUserCartQuery, useRemoveFromCartMutation, useUpdateCartMutation,  } from "@/feature/cart/cartApi";
import MainLayout from "../layouts/MainLayout";
import CTABtn from "../components/common/CTABtn"
import { PiArrowLeft, PiMinus, PiPlus, PiTrash } from "react-icons/pi";
import toast from "react-hot-toast";
import { formatToINR } from '../utils/currency';
import EmptyCart from "../../public/Assets/emptyBox.png"

const Cart: React.FC = () => {
  const { data } = useGetUserCartQuery();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const updateQuantity = async(productId:string, quantity:number) => {
    if(quantity < 1) return;
    try {
        await updateCart({productId, quantity}).unwrap();
        toast.success("You've changed Qauntity to '1'")
    } catch (error) {
        toast.error("Update failed");
    }
  }

  const removeItem = async(productId:string) =>{
    try {
        await removeFromCart(productId).unwrap();
        toast.success("Item removed from cart")
    } catch (error) {
        toast.error("Issue at remove from cart")
    }
  }
  console.log("DATA", data);

  return (
    <MainLayout>
      {data?.cart?.items.length > 0 ? 
      <div className="w-11/12 mx-auto h-screen overflow-y-hidden flex flex-col gap-10">
        <div className="flex items-center justify-between pt-16">
            <h1 className="font-bold text-6xl">My Cart</h1>
            <div className="w-52"><CTABtn title="Continue Shopping" bg="black" text="white" icon={<PiArrowLeft size={25}/>}/></div>
        </div>
        <div className="flex gap-10">
            <div className="w-[75%]">
                <div className="grid grid-cols-5">
                    <div className="col-span-2">PRODUCT</div>
                    <div className="">PRICE</div>
                    <div className="">QUANTITY</div>
                    <div className="">TOTAL</div>
                </div>
                <div className="h-[70vh] overflow-y-auto hide-scrollbar">
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
                                    <div className="flex font-medium text-green-500 items-center">{formatToINR(item?.product?.price)}</div>
                                    <div className="flex gap-3 items-center">
                                        <button className="rounded-full p-1 border cursor-pointer" disabled={isUpdating} onClick={() => updateQuantity(item?._id, item?.quantity-1)}><PiMinus/></button>
                                        <div>{item?.quantity}</div>
                                        <button className="rounded-full p-1 border cursor-pointer" disabled={isUpdating} onClick={() => updateQuantity(item?._id, item?.quantity+1)}><PiPlus/></button>
                                    </div>
                                    <div className="flex items-center justify-between mr-10">
                                    <div>{formatToINR(item?.subtotal)}</div>
                                    <div onClick={() => removeItem(item?._id)} className="text-red-400 text-2xl"><PiTrash size={20}/></div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="flex h-fit flex-col gap-5 bg-gray-200 w-[25%] p-5 rounded-2xl mx-auto ">
                <h1 className="font-bold text-xl">Order Summary</h1>
                <div className="grid grid-cols-2 gap-y-2">
                    <h3 className="text-left">Items :</h3>
                    <h3 className="text-right">{data?.cart?.items.length}</h3>
                    <h3 className="text-left">Subtotal :</h3>
                    <h3 className="text-right">{formatToINR(data?.cart?.subtotal)}</h3>
                    <h3 className="text-left">Discount ({data?.cart?.discountPercentage}%) :</h3>
                    <h3 className="text-right">-{formatToINR(data?.cart?.discount)}</h3>
                    <h3 className="text-left">Shipping Charge</h3>
                    <h3 className="text-right">{formatToINR(data?.cart?.shippingCharge)}</h3>
                    <h3 className="text-left">Platform Fee</h3>
                    <h3 className="text-right">{formatToINR(2)}</h3>
                    <h3 className="text-left font-bold border-t mt-3 pt-5 border-t-black border-dashed w-full">Total</h3>
                    <h3 className="text-right border-t mt-3 pt-5 border-t-black border-dashed w-full">{formatToINR(data?.cart?.finalAmount)}</h3>
                </div>
                <CTABtn bg="black" text="white" icon="" title="Proceed to Checkout"/>

            </div>
        </div>
      </div> : <div className="w-11/12 mx-auto h-screen overflow-y-hidden flex items-center justify-center flex-col gap-2">
        <img loading="lazy" className="w-[30rem]" src={EmptyCart}/>
        <div className="flex flex-col items-center gap-8">
            <h2 className="font-bold text-4xl sm:text-5xl">Empty Shopping Cart</h2>
            <div className="w-60"><CTABtn title="Back to Shopping" bg="black" icon={<PiArrowLeft size={20}/>} text="white"/></div>
        </div>
      </div>}
    </MainLayout>
  );
};

export default Cart;
