import request from 'supertest';
import { app } from '../../..';
import { getAccessToken } from '../../../utils/jwt.util';

let token: string;
beforeEach(() => {
  token = getAccessToken({ id: "02d5b458-914f-4992-8cde-6dbe9f7b6dc8", type: "SELLER" });
});

jest.setTimeout(10000);
describe('POST /api/seller/products', () => {
    it('should return 201 response', async () => {
        const response = await request(app)
            .post("/api/seller/products")
            .set('Authorization', 'Bearer ' + token)
            .send({
                products: [
                    {
                        name: "Product 1",
                        price: 10
                    },
                    {
                        name: "Product 2",
                        price: 20
                    }
                ]
            });
        expect(response.status).toBe(201);
    });

    it('should return 400 response', async () => {
        const response = await request(app)
            .post("/api/seller/products")
            .set('Authorization', 'Bearer ' + token)
            .send({
                products: [
                    {
                        name: "Product 1",
                        price: 10
                    },
                    {
                        name: "Product 2",
                        price: "20a"
                    }
                ]
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 response', async () => {
        const response = await request(app)
            .post("/api/seller/products")
            .set('Authorization', 'Bearer ' + token)
            .send({
                products: [
                    {
                        name: "Product 1",
                        price: 10
                    },
                    {
                        name: "Product 2",
                        price: "20"
                    }
                ]
            });
        expect(response.status).toBe(400);
    });
});
