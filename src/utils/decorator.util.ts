import { Request, Response } from "express";
import { log } from "./logger.util";
import { v4 as uuid } from "uuid";

export function ControllerLogger() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const functionName = propertyKey;
        const originalMethod = descriptor.value;
        descriptor.value = async function (req: Request, res: Response) {
            const traceId = req.headers["x-trace-id"] || uuid();
            const start = performance.now();
            log.info(`${traceId} - ${functionName} - Start`);
            try {
                const result = await originalMethod.apply(this, [req, res]);

                const end = performance.now();
                log.info(`${traceId} - ${functionName} - End - ${end - start}ms`);
                return res.status(result.statusCode).json({
                    status: result.status,
                    message: result.message,
                    data: result.data,
                    traceId
                });
            } catch (error: any) {
                const end = performance.now();
                log.info(`${traceId} - ${functionName} - End - ${end - start}ms`);
                return res.status(error.statusCode).json({
                    status: "error",
                    message: error.message,
                    data: error.data,
                    traceId
                });
            }
        }
        return descriptor;
    }
}
