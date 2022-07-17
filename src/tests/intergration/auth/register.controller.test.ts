import { v4 as uuid } from 'uuid';
import request from 'supertest';
import { app } from '../../..';

jest.setTimeout(10000);
describe("POST /api/auth/register", () => {
    it("should return a 201 response", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "John",
                lastName: "Doe",
                type: "BUYER",
                email: uuid().replace("-", "") + "@gmail.com",
                password: "r@nDoPa55o"
            });
        expect(response.status).toBe(201);
    });

    it("should return a 400 response", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "John",
                lastName: "Doe",
                type: "BUYER",
                email: "",
                password: "r@nDoPa55o"
            });
        expect(response.status).toBe(400);
    });

    it("should return a 400 response", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "John",
                lastName: "Doe",
                type: "BUYER",
                email: uuid().replace("-", "") + "@gmail.com",
                password: "12345678"
            });
        expect(response.status).toBe(400);
    });

    it("should return a 400 response", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "John",
                lastName: "Doe",
                type: "ADVOCATE",
                email: uuid().replace("-", "") + "@gmail.com",
                password: "r@nDoPa55o"
            });
        expect(response.status).toBe(400);
    });
});
