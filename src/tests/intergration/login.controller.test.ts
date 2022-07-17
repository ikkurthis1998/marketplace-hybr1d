import request from 'supertest';
import { app } from '../../.';

jest.setTimeout(10000);
describe("POST /api/auth/login", () => {
    it("should return a 200 response", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "john@doe.com",
                password: "r@nDoPa55y"
            });
        expect(response.status).toBe(200);
    });

    it("should return a 400 response", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "",
                password: "r@nDoPa55y"
            });
        expect(response.status).toBe(400);
    });

});
