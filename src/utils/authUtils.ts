// Function to save the token
export const saveToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};
