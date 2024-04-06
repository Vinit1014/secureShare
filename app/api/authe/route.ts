import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

// export async function GET(req:Request, res:Response){
// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

export async function POST(req:Request){
    
    try{
        const body = await req.json();
        const {email,password,private_key} = body;

        // check if email already exists
        let {data:User, error} = await supabase
        .from('User')
        .select('email')
        .eq('email',email)
        .eq('password',password)
        console.log(User);
        
        if (User.length>0) {
            return NextResponse.json({user:email,message:"Thank you"})   
        }
        
        let tempData = {
            created_at:new Date(),
            email:String(email),
            password:String(password),
            private_key:String(private_key)
        }

        const data = await supabase
            .from('User')
            .insert([tempData])
            .select()
        if (data) {
            return NextResponse.json({data:email,message:"User inserted successfully"},{status:201});
        }else{
            return NextResponse.json({"message":"Not inserted"},{status:400})
        }

    }catch(error){
        return NextResponse.json(error);
        // console.log(error);
    }

}