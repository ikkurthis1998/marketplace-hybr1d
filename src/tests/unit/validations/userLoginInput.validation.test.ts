import { validate } from '../../../validations';
import { UserLoginInputSchema } from '../../../validations/userLoginInput.validation';

describe("UserLoginInputValidation", () => {
    it("should return success for logging with email", () => {
        const input = {
            email: "john@doe.com",
            password: "123456"
        }

        const validation = validate(input, UserLoginInputSchema);

        expect(validation.status).toBe("success");
    });

    it("should return success for logging with phone", () => {
        const input = {
            phone: "123456789",
            password: "123456"
        }

        const validation = validate(input, UserLoginInputSchema);

        expect(validation.status).toBe("success");
    });

    it("should throw error if logging with both email and phone", () => {
        const input = {
            email: "john@doe.com",
            phone: "123456789",
            password: "123456"
        }

        try {
            const validation = validate(input, UserLoginInputSchema);
            expect(validation.status).toBe("error");
        } catch (error: any) {
            expect(error.status).toBe("error");
        }
    });

    it("should throw error if both email and phone are not given", () => {
        const input = {
            password: "123456"
        }
        try {
            const validation = validate(input, UserLoginInputSchema);
            expect(validation.status).toBe("error");
        } catch (error: any) {
            expect(error.status).toBe("error");
        }
    });
});