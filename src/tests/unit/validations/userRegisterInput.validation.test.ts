import { validate } from '../../../validations';
import { UserRegisterInputSchema } from '../../../validations/userRegisterInput.validation';

describe("UserRegisterInputValidation", () => {
    it("return success for BUYER registering with email", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "BUYER",
            email: "john@doe.com",
            password: "123456"
        }

        const validation = validate(input, UserRegisterInputSchema);

        expect(validation.status).toBe("success");
    });

    it("return success for SELLER registering with email", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "SELLER",
            email: "john@doe.com",
            password: "123456"
        }

        const validation = validate(input, UserRegisterInputSchema);

        expect(validation.status).toBe("success");
    });

    it("return success for BUYER registering with phone", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "BUYER",
            phone: "123456789",
            password: "123456"
        }

        const validation = validate(input, UserRegisterInputSchema);

        expect(validation.status).toBe("success");
    });

    it("return success for SELLER registering with phone", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "SELLER",
            phone: "123456789",
            password: "123456"
        }

        const validation = validate(input, UserRegisterInputSchema);

        expect(validation.status).toBe("success");
    });

    it("return success for BUYER registering with both email and phone", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "BUYER",
            email: "john@doe.com",
            phone: "123456789",
            password: "123456"
        }

        const validation = validate(input, UserRegisterInputSchema);

        expect(validation.status).toBe("success");
    });
        
    it("return success for SELLER registering with both email and phone", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "SELLER",
            email: "john@doe.com",
            phone: "123456789",
            password: "123456"
        }

        const validation = validate(input, UserRegisterInputSchema);

        expect(validation.status).toBe("success");
    });

    it("should throw error if both email and phone are not given", () => {
        const input = {
            firstName: "John",
            lastName: "Doe",
            type: "BUYER",
            password: "123456"
        }
        try {
            const validation = validate(input, UserRegisterInputSchema);
            expect(validation.status).toBe("error");
        } catch (error: any) {
            expect(error.status).toBe("error");
        }
    });
});