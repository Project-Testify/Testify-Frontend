export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;  
    expiresIn: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}
