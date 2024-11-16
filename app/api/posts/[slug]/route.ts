import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";

//GETS SINGE POST

export const GET = async (req: Request, { params }: { params: { slug: string } }) => {
    const { slug } = params;
    try {
        
        const post = await prisma.post.findUnique({
            where: {
                slug,
            },
            include:{user:true}, 
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {   
        console.log(error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}