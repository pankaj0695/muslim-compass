"use server";

import { auth, signIn, signOut } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signOutWithGoogle() {
  await signOut({ redirect: true });
}

export async function getUser() {
  const session = await auth();
  return session?.user;
}
