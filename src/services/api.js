// Base service helper for localStorage data management
export const getStorageData = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

export const setStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};