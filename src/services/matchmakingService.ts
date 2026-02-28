import api from "./api";

export const matchmakingService = {
    getMatches: async (filters: any) => {
        const params = new URLSearchParams();

        if (filters?.minAge) params.append("minAge", filters.minAge.toString());
        if (filters?.maxAge) params.append("maxAge", filters.maxAge.toString());
        if (filters?.religion) params.append("religion", filters.religion);
        if (filters?.city) params.append("city", filters.city);

        const queryString = params.toString();
        const url = queryString ? `/matches?${queryString}` : "/matches";

        const response = await api.get(url);
        return response.data;
    },

    browseProfiles: async (filters: any) => {
        const params = new URLSearchParams();

        if (filters?.search) params.append("search", filters.search);
        if (filters?.minAge) params.append("minAge", filters.minAge.toString());
        if (filters?.maxAge) params.append("maxAge", filters.maxAge.toString());
        if (filters?.religion) params.append("religion", filters.religion);
        if (filters?.city) params.append("city", filters.city);

        const queryString = params.toString();
        const url = queryString
            ? `/api/test/browse-profiles?${queryString}`
            : "/api/test/browse-profiles";

        const response = await api.get(url);
        return response.data;
    },

    searchMatches: async (filters: any) => {
        const params = new URLSearchParams();

        if (filters.minAge) params.append("minAge", filters.minAge.toString());
        if (filters.maxAge) params.append("maxAge", filters.maxAge.toString());
        if (filters.religion) params.append("religion", filters.religion);
        if (filters.city) params.append("city", filters.city);
        if (filters.maritalStatus)
            params.append("maritalStatus", filters.maritalStatus);

        const queryString = params.toString();
        const url = queryString
            ? `/matches/search?${queryString}`
            : "/matches/search";

        const response = await api.get(url);
        return response.data;
    },
};
