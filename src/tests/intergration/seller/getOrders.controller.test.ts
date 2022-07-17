import request from 'supertest';
import { app } from '../../..';
import { getAccessToken } from '../../../utils/jwt.util';

let token: string;
beforeEach(() => {
  token = getAccessToken({ id: "02d5b458-914f-4992-8cde-6dbe9f7b6dc8", type: "SELLER" });
});

describe("GET /api/seller/orders", () => {
    it("should return 200 response", async () => {
        const response = await request(app)
            .get("/api/seller/orders")
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
