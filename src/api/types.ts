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



export interface ExamResponse {
    id: number;
    title: string;
    description: string;
    instructions: string;
    duration: number;
    startDatetime: string;
    endDatetime: string;
    isPrivate: boolean;
    createdBy: UserResponse;
    organization: OrganizationResponse;
    moderator?: ExamSetterResponse; // Nullable
    proctors: ExamSetterResponse[]; // Empty array if none
    candidates: CandidateResponse[]; // Empty array if none
    questionSequence: number[]; // List of question IDs
}

// Response object for the user who created the exam
export interface UserResponse {
    id: number;
    email: string;
}

// Response object for the organization that owns the exam
export interface OrganizationResponse {
    id: number;
    firstName: string;
}

// Response object for exam setters (moderator, proctors)
export interface ExamSetterResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

// Response object for candidates
export interface CandidateResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}


