import { auth } from "@/app/auth";
import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";

export const GET = async (req : Request) =>{

    const {searchParams} = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const cat = searchParams.get("cat") || "";

    const POST_PER_PAGE = 2;
    const query = {
        skip: POST_PER_PAGE * (page - 1),
        take: POST_PER_PAGE,
        where: {
            ...(cat && { catSlug: cat }),
        },
    }
    try {
        const[posts,count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({where:query.where}),
        ]);
    
        return NextResponse.json({posts,count}, { status: 200 });
    } catch (error) {   
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

export const POST = async (req: Request) => {
    const session = await auth();
    if(!session){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user?.email;
    try {
        
        const body = await req.json();
        const post = await prisma.post.create({
            data:{...body,userEmail:userEmail },
        });
        
        return NextResponse.json(post, { status: 200 });
    } catch (error) {   
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
