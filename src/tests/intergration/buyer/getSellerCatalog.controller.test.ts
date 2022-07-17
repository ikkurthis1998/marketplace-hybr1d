import request from 'supertest';
import { app } from '../../..';
import { getAccessToken } from '../../../utils/jwt.util';

let token: string;
let sellerId: string;
beforeEach(() => {
    token = getAccessToken({ id: "42765e2f-f9e2-4e51-a1a3-3d50f523791b", type: "BUYER" });
    sellerId = "02d5b458-914f-4992-8cde-6dbe9f7b6dc8";
});

jest.setTimeout(10000);
describe("GET /api/buyer/seller-catalog/:sellerId", () => {
    it("should return 200 response", async () => {
        const response = await request(app)
        .get("/api/buyer/seller-catalog/" + sellerId)
        .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it("should return 401 response", async () => {
        const response = await request(app)
            .get("/api/buyer/seller-catalog/" + sellerId);
        expect(response.status).toBe(401);
    });

    it("should return 404 response", async () => {
        const response = await request(app)
            .get("/api/buyer/seller-catalog/");
        expect(response.status).toBe(404);
    });

    it("should return 404 response", async () => {
        const response = await request(app)
            .get("/api/buyer/seller-catalog/123")
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(404);
    });

});
