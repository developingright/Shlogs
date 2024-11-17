import { prisma } from "@/app/prisma";
import { auth } from "../../auth";
import { NextResponse } from "next/server";

//GET AlL COMMENTS OF A POST

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");
    try {
        
        const comments = await prisma.comment.findMany({
            where: {
                ...(postSlug && { postSlug }),
            },
            include:{
                user:true
            }
        });
        return NextResponse.json(comments, { status: 200 });
    } catch (error) {   
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}


//CREATE A COMMENT 

export const POST = async (req: Request) => {
    const session = await auth();
    if(!session){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        
        const body = await req.json();
        const comment = await prisma.comment.create({
            data:{...body,userEmail: session.user?.email},
        });
        
        return NextResponse.json(comment, { status: 200 });
    } catch (error) {   
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

