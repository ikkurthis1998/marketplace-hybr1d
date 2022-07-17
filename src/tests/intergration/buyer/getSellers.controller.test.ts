import request from 'supertest';
import { app } from '../../..';
import { getAccessToken } from '../../../utils/jwt.util';

let token: string;
beforeEach(() => {
  token = getAccessToken({ id: "42765e2f-f9e2-4e51-a1a3-3d50f523791b", type: "BUYER" });
});

jest.setTimeout(10000);
describe("GET /api/buyer/sellers", () => {
    it("should return 200 response", async () => {
        const response = await request(app)
        .get("/api/buyer/sellers")
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it("should return 401 response", async () => {
        const response = await request(app)
            .get("/api/buyer/sellers");
        expect(response.status).toBe(401);
    });

});