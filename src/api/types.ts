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
    token: string;
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
  addressLine1?: string;
  addressLine2?: string;
  website?: string;
  verificationDocuments?: FileList;

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

export interface GenericDeleteResponse{
    success: boolean;
    message: string;
}

export interface GenericResponse{
    success: boolean;
    message: string;
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
    orderType: string;
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

export interface CoverPointRequest {
    coverPointText: string; 
    marks: number;         
}


export interface EssayRequest {
    examId: number;                        
    questionText: string;                  
    difficultyLevel: string;                
    coveringPoints: CoverPointRequest[];    
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
    browserLockdown: boolean;
    realTimeMonitoring: boolean;
    zoomLink: string;
    hosted: boolean;
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


// Define the interface for options in MCQs
export interface Option {
    optionId: number;
    optionText: string;
    correct: boolean;
    marks: number;
}

// Define the interface for cover points in Essay questions
export interface CoverPoint {
    coverPointId: number;
    coverPointText: string;
    marks: number;
}

// Define the interface for questions
export interface Question {
    comment: string;
    questionId: number;
    questionText: string;
    questionType: "MCQ" | "Essay"; // You can extend this if you have more question types
    difficultyLevel: string | null; // Assuming difficulty level is optional
    options?: Option[] | null; // Options for MCQ questions
    coverPoints?: CoverPoint[] | null; // Cover points for Essay questions
}

// Define the response interface for fetching questions
export interface FetchQuestionsResponse {
    examId: number;
    questions: Question[];
    errorMessage: string | null;
}

export interface ModerateExamResponse{
    id: number;
    title: string;
    startDatetime: string; 
    endDatetime: string;
}


