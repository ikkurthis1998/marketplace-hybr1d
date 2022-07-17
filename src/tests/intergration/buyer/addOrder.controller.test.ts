import request from 'supertest';
import { app } from '../../..';
import { getAccessToken } from '../../../utils/jwt.util';

let token: string;
let sellerId: string;
let products: {
    id: string;
    quantity: number;
}[];
beforeEach(() => {
    token = getAccessToken({ id: "42765e2f-f9e2-4e51-a1a3-3d50f523791b", type: "BUYER" });
    sellerId = "02d5b458-914f-4992-8cde-6dbe9f7b6dc8";
    products = [
        {
            id: "8414cc59-aef9-4db8-8100-34d34345c2be",
            quantity: 2
        },
        {
            id: "cfa5e0f8-49fe-4493-bd5e-49169b4d8acf",
            quantity: 1
        }
    ];
});

jest.setTimeout(10000);
describe('POST /api/buyer/add-order/:sellerId', () => {
    it('should return 201 response', async () => {
        const response = await request(app)
            .post("/api/buyer/add-order/" + sellerId)
            .set('Authorization', 'Bearer ' + token)
            .send({
                products
            });
        expect(response.status).toBe(201);
    });

    it('should return 400 response', async () => {
        const response = await request(app)
            .post("/api/buyer/add-order/" + sellerId)
            .set('Authorization', 'Bearer ' + token)
            .send({
                products: [
                    {
                        id: "8414cc59-aef9-4db8-8100-34d34345c2be",
                        quantity: 0
                    },
                    {
                        id: "cfa5e0f8-49fe-4493-bd5e-49169b4d8acf",
                        quantity: 2
                    }
                ]
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 response', async () => {
        const response = await request(app)
            .post("/api/buyer/add-order/" + sellerId)
            .set('Authorization', 'Bearer ' + token)
            .send({
                products: [
                    {
                        id: "8414cc59-aef9-4db8-8100-34d34345c2be",
                        quantity: 2
                    },
                    {
                        id: "cfa5e0f8-49fe-4493-bd5e-49169b4d8acf",
                        quantity: "2a"
                    }
                ]
            });
        expect(response.status).toBe(400);
    });

    it('should return 400 response', async () => {
        const response = await request(app)
            .post("/api/buyer/add-order/" + sellerId)
            .set('Authorization', 'Bearer ' + token)
            .send({
                products: [
                    {
                        id: "8414cc59-aef9-4db8-8100-34d34z45c2be",
                        quantity: 2
                    },
                    {
                        id: "cfa5e0f8-49fe-4493-bd5e-49169b4d8acf",
                        quantity: 2
                    }
                ]
            });
        expect(response.status).toBe(400);
    });
});
