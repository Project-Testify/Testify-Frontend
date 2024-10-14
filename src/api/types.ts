export interface LoginCredentials {
    username: string;
    password: string;
}

export interface User {
    user: any;
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
  }

export interface CandidateRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    role: string;
}

export interface ExamSetterRegister {
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
    success: boolean;
    accessToken: string;
    refreshToken: string;
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
}
export enum UserRole {
    ADMIN = 'ADMIN',
    EXAMSETTER = 'EXAMSETTER',
    CANDIDATE = 'CANDIDATE',
    ORGANIZATION = 'ORGANIZATION',
}



export interface Exam {
    title: string;
    //description: string;
    instructions: string;
    duration: number;
    totalMarks: number;
    passMarks: number;
    // examSetterId: number;
    // organizationId: number;
    startDatetime: string;
    endDatetime: string;
    private: boolean;
}

export interface Response {
    status: string;
}

export interface addExamSetter{
    examSetterId: number;
}

export interface GenericAddOrUpdateResponse{
    success: boolean;
    message: string;
    id: any;
}

export interface InviteExamSetterRequest{
    email: string;
}

export interface ExamRequestForm{
    title: string;
    description: string;
    instructions: string;
    duration: number;
    organizationId: number;
    startDatetime: string;
    endDatetime: string;
    isPrivate: boolean;
    date ?: any;
}

export interface ExamRequest{
    title: string;
    description: string;
    instructions: string;
    duration: number;
    organizationId: number;
    createdById: number;
    startDatetime: string;
    endDatetime: string;
    isPrivate: boolean;
}

export interface MCQRequest {
    examId: number;
    questionText: string;
    difficultyLevel: string;
    options: {
        optionText: string;
        marks: number;
        correct: boolean;
    }[];
    questionType: 'MCQ';
}


