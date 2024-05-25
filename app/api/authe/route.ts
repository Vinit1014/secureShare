import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function GET(req:Request, res:Response){
    let { data: User, error } = await supabase
    .from('User')
    .select('email')
    
    return NextResponse.json({message:"Users fetched successfully"})
}
// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

export async function POST(req:Request){
    // const supabase = createClientComponentClient();
    try{
        const body = await req.json();
        const {email,password,private_key} = body;
        console.log("Your email is " +email);
        // check if email already exists
        // let {data:User, error} = await supabase
        // .from('User')
        // .select('email')
        // .eq('email',email)
        // .eq('password',password)
        // console.log(User);
        
        // if (User.length>0) {
        //     return NextResponse.json({user:email,message:"Thank you"})   
        // }
        
        let tempData = {
            // id:'ui324rrdhg64',
            // created_at:new Date(),
            email:String(email),
            password:String(password),
            private_key:String(private_key)
        }

        const data = await supabase
            .from('User')
            .insert([tempData])
            .select()
        if (data) {
            console.log("User inserted successfully");
            return NextResponse.json({data:email,message:"User inserted successfully"},{status:201});
        }else{
            console.log("Not inserted");
            return NextResponse.json({"message":"Not inserted"},{status:400})
        }
        
    }catch(error){
        console.log(error);
        return NextResponse.json(error);
    }
}
