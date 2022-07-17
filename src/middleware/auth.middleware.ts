import { UserType } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { verifyAccessToken } from "../utils/jwt.util";
import { log } from "../utils/logger.util";

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        type: UserType;
    };
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const functionName = "authenticate";
    let traceId = req.headers["x-trace-id"] || uuid();
    req.headers["x-trace-id"] = traceId;
    const start = performance.now();
    log.info(`${traceId} - ${functionName} - Start`);
    try {

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: null,
                traceId
            });
        }

        const decoded = verifyAccessToken(token) as {
            id: string;
            type: UserType;
        };

        if (!decoded) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: null,
                traceId
            });
        }

        (req as AuthenticatedRequest)["user"] = decoded;
        const end = performance.now();
        log.info(`${traceId} - ${functionName} - End - ${end - start}ms`);
        next();

    } catch (error: any) {
        const end = performance.now();
        log.info(`${traceId} - ${functionName} - End - ${end - start}ms`);
        return res.status(error.statusCode || 401).json({
            status: "error",
            message: error.message,
            data: error.data,
            traceId
        });
    }
}