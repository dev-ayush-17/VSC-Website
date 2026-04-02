import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find or create admin on first login
    let admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      // Check against env credentials for first-time setup
      const envEmail = process.env.ADMIN_EMAIL;
      const envPassword = process.env.ADMIN_DEFAULT_PASSWORD;

      if (email.toLowerCase() === envEmail?.toLowerCase() && password === envPassword) {
        // Create admin with hashed password in DB
        admin = await Admin.create({
          email: email.toLowerCase(),
          password: password,
          name: "Admin",
        });
      } else {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      // Verify password against hashed version in DB
      const isValid = await admin.comparePassword(password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Create JWT
    const token = signToken({
      adminId: admin._id.toString(),
      email: admin.email,
    });

    // Set cookie
    const response = NextResponse.json({
      success: true,
      admin: { email: admin.email, name: admin.name },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
