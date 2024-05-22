import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    try{
        const body = await req.json()
        const {send_file_to,sender} = body;
        console.log(send_file_to);
        console.log("Sender was "+sender);
        
        let {data:user,error} = await supabase
        .from("User")
        .select('sent_files_to')
        .eq('email', send_file_to)  //here I am fetching the existing array
        .single();

        if (error) {
            console.log(error);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let sentFilesTo = user?.sent_files_to || []; //fetching from supabase
        if(!sentFilesTo.includes(sender)){  //if existing user is there or not
            sentFilesTo.push(sender);
        }  

        console.log(sentFilesTo);
        const {data,error:updateError} = await supabase
        .from("User")
        .update({sent_files_to:sentFilesTo})
        .eq('email', send_file_to)

        if (updateError) {
            console.log(updateError);
            return NextResponse.json({message:"Failed to update the user"},{status:500});
        }
        
        console.log("User updated successfully");
        return NextResponse.json({message:"File sent and user updated successfully"},{status:200});
        
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
