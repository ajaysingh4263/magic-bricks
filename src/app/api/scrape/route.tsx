import { NextResponse } from "next/server";
import { scrapeMagicBricks } from "@/lib/pupeeter"; // Ensure correct filename

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const city = searchParams.get("city") || "Hyderabad"; // Default city
        console.log(`📡 Fetching projects for ${city}...`);

        const projects = await scrapeMagicBricks(city);

        if (!projects || projects.length === 0) {
            console.error("⚠️ No projects found.");
            return NextResponse.json({ error: "No projects found" }, { status: 404 });
        }

        return NextResponse.json({ listings: projects });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch data" },
            { status: 500 }
        );
    }
}
