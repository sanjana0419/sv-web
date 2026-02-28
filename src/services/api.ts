import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// --- MOCK DATA ---
const MOCK_DATA: Record<string, any> = {
    "/auth/login": {
        token: "mock-jwt-token-123",
        userId: "1",
        email: "test@example.com",
        fullName: "Test User",
    },
    "/auth/send-otp": { success: true, message: "OTP sent successfully" },
    "/auth/verify-otp": { success: true, message: "OTP verified" },
    "/auth/set-password": {
        token: "mock-jwt-token-123",
        userId: "1",
        email: "test@example.com",
        fullName: "Test User",
    },
    "/profile": {
        fullName: "Rohan Sharma",
        gender: "Male",
        dateOfBirth: "1995-05-15",
        height: 175,
        weight: 70,
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        religion: "Hindu",
        community: "Brahmin",
        occupation: "Software Engineer",
        annualIncome: 1500000,
        aboutMe: "I am a simple person looking for a life partner.",
    },
    "/matches": [
        { userId: 2, fullName: "Ananya Iyer", age: 26, city: "Pune", religion: "Hindu", occupation: "Doctor", matchScore: 85 },
        { userId: 3, fullName: "Priya Singh", age: 25, city: "Delhi", religion: "Hindu", occupation: "Designer", matchScore: 78 },
        { userId: 4, fullName: "Sneha Reddy", age: 27, city: "Bangalore", religion: "Hindu", occupation: "Manager", matchScore: 72 },
        { userId: 5, fullName: "Aditi Gupta", age: 24, city: "Mumbai", religion: "Hindu", occupation: "Architect", matchScore: 65 },
    ],
};

const BASE_URL = "http://localhost:8082"; // Adjust as needed

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log(`[MOCK API] Attempting: ${config.method?.toUpperCase()} ${config.url}`);

        // In web, we use localStorage instead of SecureStore
        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
        const config = error.config;
        const cleanUrl = config?.url?.split('?')[0] || '';

        if (MOCK_DATA[cleanUrl]) {
            console.log(`[MOCK API] Returning mock data for: ${cleanUrl}`);
            return {
                data: MOCK_DATA[cleanUrl],
                status: 200,
                statusText: 'OK',
                headers: {},
                config: config,
            } as AxiosResponse;
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_id");
        }

        return Promise.reject(error);
    }
);

export default api;
