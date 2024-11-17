import { prisma } from "@/app/prisma";
import { NextResponse } from "next/server";

export const GET = async () =>{
    try {
        const categories = await prisma.category.findMany();

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!" ,error: error}, { status: 500 });
    }
}