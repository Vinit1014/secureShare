import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    try{
        const body = await req.json()
        const {send_file_to} = body;
        console.log(send_file_to);

        let {data:user,error} = await supabase
        .from("User")
        .select('sent_files_to')
        .eq('email', send_file_to)  //here I am fetching the existing array
        .single();

        if (error) {
            console.log(error);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let sentFilesTo = user?.sent_files_to || [];
        if(!sentFilesTo.includes(send_file_to)){  //if existing user is there or not
            sentFilesTo.push(send_file_to);
        }  

        

        return NextResponse.json({message:"You side is hello"})
        
    }catch(error){
        console.log(error);
        return NextResponse.json(error);
    }
}
