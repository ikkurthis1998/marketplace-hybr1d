import { checkPasswordStrength } from "../../../utils/checkPasswordStrength.util";

describe("checkPasswordStrength", () => {
    it("should throw error if password is not strong", () => {
        const password = "123456";
        try {
            const result = checkPasswordStrength({ password });
            expect(result.status).toBe('error');
        } catch (error: any) {
            expect(error.status).toBe('error');
        }
    });

    it("should return success if password is strong", () => {
        const password = "221998@sSree";
        const result = checkPasswordStrength({password});
        expect(result.status).toBe('success');
    });
});
