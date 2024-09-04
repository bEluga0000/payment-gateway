import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"
const razorPay = new Razorpay({
    key_id: process.env.NEXT_TEST_RAZORY_KEY ? process.env.NEXT_TEST_RAZORY_KEY : "",
    key_secret: process.env.NEXT_TEST_RAZORY_SECRET
})
export async function POST(req:NextRequest){
    try{
        const data = await req.json()
        const order = await razorPay.orders.create(data)
        if (!order)
            return NextResponse.json({ msg: "order not generated" }, { status: 401 })
        return NextResponse.json({ msg: "order created", order }, { status: 201 })
    }
    catch(e){
        return NextResponse.json({ msg: "order not generated" ,e}, { status: 401 })
    }
    
}