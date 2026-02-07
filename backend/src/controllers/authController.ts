import { supabase } from "../supabaseClient";
import { sendWelcomeEmail } from "../utils/emailService"; // Resend wrapper
import jwt from "jsonwebtoken"; // if you still want your own JWT

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // set properly in .env

export async function signup(
  username: string,
  email: string,
  password: string
) {
  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // stored in user_metadata
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user) {
    throw new Error("User not returned from Supabase signup");
  }

  // 2. Optional: create a row in a profiles table if you’re using one
  // await supabase.from("profiles").insert({ id: user.id, username });

  // 3. Send welcome email via Resend
  await sendWelcomeEmail(email, username);

  // 4. Optional: issue your own JWT for the frontend
  const token = jwt.sign(
    { sub: user.id, email: user.email, username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 5. Return data to your route
  return {
    success: true,
    message: "Account created successfully!",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username,
    },
  };
}


export async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      throw new Error(error.message);
    }
  
    const { user, session } = data;
  
    if (!user || !session) {
      throw new Error("Invalid login");
    }
  
    const token = jwt.sign(
      { sub: user.id, email: user.email, username: user.user_metadata?.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    return {
      success: true,
      message: "Login successful",
      token, // or session.access_token if you prefer
      user: {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username,
      },
    };
  }