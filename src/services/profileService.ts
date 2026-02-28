import api from "./api";

export const profileService = {
    // Get Profile
    getProfile: async () => {
        const response = await api.get("/profile");
        return response.data;
    },

    // Create or Update Profile
    saveOrUpdateProfile: async (profileData: any) => {
        return api.post("/profile", profileData);
    },
};
