"use client";
import React,{useState} from "react";
import Script from "next/script";
import axios from "axios";
declare global{
  interface Window{
    Razorpay:any
  }
}
export default function Home() {
  const [isProcessing,setIsProcessing] = useState<boolean>(false)
  const handelPayment = async ()=>{
    setIsProcessing(true)
    try{
      const res = await axios.post("http://localhost:3000/api/order", {
        amount: 500,
        currency: "INR",
        receipt: "qwsaq1",
        partial_payment: true,
        first_payment_min_amount: 230,
      });
      console.log(res.data); 
      var options = {
        "key": process.env.NEXT_PUBLIC_RAZORY_KEY, // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response:any) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
          // handel function u need to do that after successfull payment
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      const rzp1 = new window.Razorpay(options)
      rzp1.open();
    }catch(e)
    {
      console.log(e)
    }finally{
      setIsProcessing(false)
    }
  }
  return (
      <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div>
        <button onClick={handelPayment} disabled={isProcessing}>{isProcessing? "processing... ":"paynow"}</button>
      </div>
      </div>
  );
}
