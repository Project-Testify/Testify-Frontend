export interface LoginCredentials {
    username: string;
    password: string;
}

export interface StudentRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string
}

export interface EducatorRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string
}

export interface OrganizationRegister {
    email: string;
    password: string;
    name: string;
    mobile: string;
}

export interface AuthResponse {
    token: string;  
    expiresIn: number;
    user: {
        id: number;
        email: string;
        role: string;
    };
}
