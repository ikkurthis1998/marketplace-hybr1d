import { authRouter } from "./auth.router";
import { buyerRouter } from "./buyer.router";
import { sellerRouter } from "./seller.router";

export const router = [
    {
        path: "/auth",
        router: authRouter
    },
    {
        path: "/seller",
        router: sellerRouter
    },
    {
        path: "/buyer",
        router: buyerRouter
    }
]
