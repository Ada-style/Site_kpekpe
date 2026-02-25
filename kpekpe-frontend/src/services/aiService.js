import api from './api';

export const chatWithAI = async (message, history = []) => {
    try {
        const response = await api.post('/messages/ai/', {
            message,
            history
        });
        return response.data.reply;
    } catch (error) {
        console.error("AI Chat Error:", error);
        throw error;
    }
};
