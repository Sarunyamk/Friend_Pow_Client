import axiosInstance from "../utils/axiosInstance";

export const sendEmailApi = async (recipient, subject, message, token) => {
    try {
        const response = await axiosInstance.post(
            '/user/send-email',
            { recipient, subject, message },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response;
    } catch (error) {
        console.error("Error in sendEmailApi:", error);
        throw error;
    }
};

export const getProfile = (token) => {

    return axiosInstance.get("/user/profile/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}


export const editProfile = (id, token, user) => {
    return axiosInstance.patch(`/user/edit-profile/${id}`, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};