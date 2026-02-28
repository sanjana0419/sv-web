import api from "./api";

export interface AuthDto {
    email?: string;
    mobile?: string;
    otp?: string;
    password?: string;
    confirmPassword?: string;
    token?: string;
    userId?: string;
    fullName?: string;
}

export const authService = {
    // Login
    login: async (identifier: string, password: string): Promise<AuthDto> => {
        const isEmail = identifier.includes("@");
        const payload: AuthDto = {
            password: password,
            ...(isEmail ? { email: identifier } : { mobile: identifier }),
        };

        const response = await api.post<AuthDto>("/auth/login", payload);
        const data = response.data;

        if (data.token) {
            localStorage.setItem("auth_token", data.token);
            localStorage.setItem("user_info", JSON.stringify(data));
        }
        return data;
    },

    // Signup Flow - Send OTP
    sendOtp: async (mobile: string) => {
        return api.post("/auth/send-otp", { mobile });
    },

    // Signup Flow - Verify OTP
    verifyOtp: async (mobile: string, otp: string) => {
        return api.post("/auth/verify-otp", { mobile, otp });
    },

    // Signup Flow - Set Password
    setPassword: async (mobile: string, password: string): Promise<AuthDto> => {
        const response = await api.post<AuthDto>("/auth/set-password", {
            mobile,
            password,
            confirmPassword: password,
        });
        const data = response.data;

        if (data.token) {
            localStorage.setItem("auth_token", data.token);
            localStorage.setItem("user_info", JSON.stringify(data));
        }
        return data;
    },

    // Logout
    logout: async () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_info");
    },

    // Forgot Password
    forgotPasswordOtp: async (identifier: string) => {
        const isEmail = identifier.includes("@");
        const payload: AuthDto = isEmail
            ? { email: identifier }
            : { mobile: identifier };
        return api.post("/auth/forgotpassword", payload);
    },

    verifyForgotPasswordOtp: async (identifier: string, otp: string) => {
        const isEmail = identifier.includes("@");
        const payload: AuthDto = {
            otp,
            ...(isEmail ? { email: identifier } : { mobile: identifier }),
        };
        return api.post("/auth/resetpassotp", payload);
    },

    resetPassword: async (identifier: string, password: string) => {
        const isEmail = identifier.includes("@");
        const payload: AuthDto = {
            password,
            confirmPassword: password,
            ...(isEmail ? { email: identifier } : { mobile: identifier }),
        };
        return api.post("/auth/resetpassword", payload);
    },
};
