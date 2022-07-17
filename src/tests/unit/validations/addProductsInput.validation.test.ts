import { IAddProductsInput } from '../../../controller/seller.controller';
import { validate } from '../../../validations';
import { AddProductsInputSchema } from '../../../validations/addProductsInput.validation';

describe("AddProductsInput", () => {
    it("should return success", () => {
        const input: IAddProductsInput = {
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
        };

        const validation = validate(input, AddProductsInputSchema);

        expect(validation.status).toBe("success");
    });

    it("should return error", () => {
        const input = {
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
        };

        try {
            const validation = validate(input, AddProductsInputSchema);
            expect(validation.status).toBe("error");
        } catch (error: any) {
            expect(error.status).toBe("error");
        }

    });
});
