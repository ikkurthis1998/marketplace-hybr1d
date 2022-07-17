import { authRouter } from "./auth.router";

export const router = [
    {
        path: "/auth",
        router: authRouter
    }
]
