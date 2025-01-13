// app/api/stripe/validate-session/route.ts
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();
    
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session) {
      return NextResponse.json({ success: false, error: "Invalid session" });
    }
    return NextResponse.json({
      success: true,
      userId: user.id,
    });
  } catch (error) {
    console.error("Error validating stripe session:", error);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}