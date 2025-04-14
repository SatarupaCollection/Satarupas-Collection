import { NextResponse,NextRequest } from "next/server";
import { getUserData, postUserData } from "../../../../lib/mongo/controller/user";
export async function GET(req,res){
    try{
      const url= new URL(req.url);
        const dat = await url.searchParams.get('email');
        console.log("back1",dat);
        const {data,err} = await getUserData(dat);
        if(err){
            throw new Error(err);
        }
        return NextResponse.json({
            data: data,
            message: "Hello",
        });
    }catch(error){
        console.log('Error fetching Com dataaa:', error);
        return NextResponse.json({
            data: [],
            error: error,
            message: "Error fetching Com data",
        });
    }
}
export async function POST(req,res){
    try{
        //console.log(await req.json());
        let dataa = await req.json();
        console.log("DATA",dataa);
        const {data,err} = await postUserData({Email:dataa.email,Username:dataa.username,Phone:dataa.phoneNumber});
        if(err){
            throw new Error(err);
        }
        return NextResponse.json({
            data: data,
            message: "Success!",
        });
    }catch(error){
        console.log('Error fetching Com dataaa:', error);
        return NextResponse.json({
            data: [],
            error: error,
            message: "Error posting Com data",
        });
    }
}