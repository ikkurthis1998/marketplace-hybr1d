import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

const accessPrivateSecret = fs.readFileSync(
	path.resolve(__dirname, "../certs/access_private.pem")
);

const accessPublicSecret = fs.readFileSync(
	path.resolve(__dirname, "../certs/access_public.pem")
);

const signToken = (payload: any, secret: Buffer, expiresIn: string) => {
	return jwt.sign(payload, secret, {
		algorithm: "RS256",
		expiresIn
	});
};

const verifyToken = (token: string, secret: Buffer) => {
	return jwt.verify(token, secret);
};

export const getAccessToken = (payload: any) => {
	return signToken(payload, accessPrivateSecret, "1h");
};

export const verifyAccessToken = (token: string) => {
	return verifyToken(token, accessPublicSecret);
};
