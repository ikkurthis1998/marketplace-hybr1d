import request from 'supertest';
import { app } from '../../.';

jest.setTimeout(10000);
describe("POST /user/login", () => {
    it("should return a 200 response", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({
                email: "john@doe.com",
                password: "r@nDoPa55y"
            });
        expect(response.status).toBe(200);
    });

    it("should return a 400 response", async () => {
        const response = await request(app)
            .post("/api/user/login")
            .send({
                email: "",
                password: "r@nDoPa55y"
            });
        expect(response.status).toBe(400);
    });

});
