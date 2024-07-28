import { User } from '../api/types';

// Function to get the logged-in user data from local storage
export const getLoggedInUser = (): User | null => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
        try {
            return JSON.parse(userJson) as User;
        } catch (error) {
            console.error('Error parsing user data from local storage:', error);
            return null;
        }
    }
    return null;
};

// Function to get the access token from local storage
export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

// Function to check if a user is logged in
export const isLoggedIn = (): boolean => {
    return getLoggedInUser() !== null && getAccessToken() !== null;
};
