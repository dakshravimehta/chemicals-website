import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

  try {
    const body = await request.json();
    const { name, company, email, phone, interest, message } = body;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const htmlContent = `
      <h2>New Inquiry from Chemicals Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Interest:</strong> ${interest || "N/A"}</p>
      <p><strong>Requirements:</strong></p>
      <p>${message}</p>
    `;

    const data = await resend.emails.send({
      from: "Inquiries <onboarding@resend.dev>", // Note: Resend onboarding domain, change to verified domain later for production
      to: ["dakshravimehta@gmail.com"], 
      subject: `New Inquiry from ${name} (${company || "Web"})`,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to send inquiry:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
