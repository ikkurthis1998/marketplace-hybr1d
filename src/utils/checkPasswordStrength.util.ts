import zxcvbn from "zxcvbn";

export const checkPasswordStrength = ({
	password
}: {
	password: string;
}) => {

	if (password && password.length < 8) {
        throw {
            status: 'error',
            statusCode: 400,
            message: "Password length must be at least 8 characters"
        }
	}

	if (password && password.length > 32) {
        throw {
            status: 'error',
            statusCode: 400,
            message: "Password length must be less than 32 characters"
        }
	}

	const lowerCaseRegex = /^(?=.*[a-z]).+$/;

	const upperCaseRegex = /^(?=.*[A-Z]).+$/;

	const numberRegex = /^(?=.*[0-9]).+$/;

	const specialCharRegex = /^(?=.*[-+_!@#$%^&*.,?\\]).+$/;

	if (!lowerCaseRegex.test(password)) {
        throw {
            status: 'error',
            statusCode: 400,
            message: "Password must contain at least one lower case character"
        }
	}

	if (!upperCaseRegex.test(password)) {
        throw {
            status: 'error',
            statusCode: 400,
            message: "Password must contain at least one upper case character"
        }
	}

	if (!numberRegex.test(password)) {
        throw {
            status: 'error',
            statusCode: 400,
            message: "Password must contain at least one number"
        }
	}

	if (!specialCharRegex.test(password)) {
        throw {
            status: 'error',
            statusCode: 400,
            message: "Password must contain at least one special character"
        }
	}

	const { score, feedback } = zxcvbn(password);

	if (score <= 2) {
        throw {
            status: 'error',
            statusCode: 400,
            message: feedback.warning,
            data: {
                score,
                feedback
            }
        }
	}

    return {
        status: 'success',
        statusCode: 200,
        message: `Password strength is ${score}`,
        data: {
            score,
            feedback
        }
	};
};
