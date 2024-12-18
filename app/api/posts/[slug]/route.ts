import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";

//GETS SINGE POST

export const GET = async (req: Request, { params }: { params: any}) => {
    const { slug } = params;
    try {
        
        const post = await prisma.post.update({
            where: {
                slug,
            },
            data: { views :{increment:1}},  
            include:{user:true}, 
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {   
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}