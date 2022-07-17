import { IAddOrderInput } from '../../../controller/buyer.controller';
import { validate } from '../../../validations';
import { AddOrderInputSchema } from '../../../validations/addOrderInput.validation';

describe("AddProductsInput", () => {
    it("should return success", () => {
        const input: IAddOrderInput = {
            products: [
                {
                    id: "1",
                    quantity: 1
                },
                {
                    id: "2",
                    quantity: 2
                }
            ]
        };

        const validation = validate(input, AddOrderInputSchema);

        expect(validation.status).toBe("success");
    });

    it("should return error", () => {
        const input = {
            products: [
                {
                    id: "1",
                    quantity: 0
                },
                {
                    id: "2",
                    quantity: 2
                }
            ]
        };

        try {
            const validation = validate(input, AddOrderInputSchema);
            expect(validation.status).toBe("error");
        } catch (error: any) {
            expect(error.status).toBe("error");
        }

    });

    it("should return error", () => {
        const input = {
            products: [
                {
                    id: "1",
                    quantity: 1
                },
                {
                    id: "2",
                    quantity: "2"
                }
            ]
        };

        try {
            const validation = validate(input, AddOrderInputSchema);
            expect(validation.status).toBe("error");
        } catch (error: any) {
            expect(error.status).toBe("error");
        }

    });
});
