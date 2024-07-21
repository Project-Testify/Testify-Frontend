export interface LoginCredentials {
    username: string;
    password: string;
}

export interface CandidateRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    role: string;
}

export interface TutorRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface OrganizationRegister {
    firstName?: string;
    email?: string;
    contactNo?: string;
    password?: string;
    cPassword?: string;
    terms?: boolean;
    city?: string;
    state?: string;

}

export interface AuthResponse {
    token: string;  
    expiresIn: number;
    
        id: number;
        email: string;
        role: string;
    
}



export interface Exam {
    title: string;
    description: string;
    instructions: string;
    duration: number;
    totalMarks: number;
    passMarks: number;
    examSetterId: number;
    organizationId: number;
    startDatetime: string;
    endDatetime: string;
    private: boolean;
}

export interface Response {
    status: string;
}