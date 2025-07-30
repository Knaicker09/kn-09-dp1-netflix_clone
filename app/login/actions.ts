"use server"

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

type LoginState = {
    errors?: {
        email?: string | null;
        password?: string | null;
    };
} | undefined;

const testUser = {
    id: "1",
    email: "mywork.07@outlook.com",
    password: "PSQ22@wVt",
}

const loginSchema = z.object({
    email: z.email({ message: "Invalid Email Address" }).trim(),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }).trim(),
})

export async function login(prevState: LoginState, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        const treeified = z.treeifyError(result.error).properties;
        return {
            errors: {
                email: treeified?.email?.errors || null,
                password: treeified?.password?.errors || null
            },
        }
    }
    if (result.data.email !== testUser.email || result.data.password !== testUser.password) {
        return {
            errors: {
                email: "Invalid email or password",
                password: null
            },
        }
    }
    await createSession(testUser.id);
    redirect("/browse");
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}