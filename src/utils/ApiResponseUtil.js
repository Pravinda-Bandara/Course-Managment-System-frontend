const handleApiResponse = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'An error occurred');
    }
};

export default handleApiResponse;