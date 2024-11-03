// MCQ Option Request Interface
export interface MCQOptionRequest {
    optionText: string; // Text of the option
    correct: boolean;    // Indicates if the option is correct
    marks: number;       // Marks for the option
}

// MCQ Update Request Interface
export interface MCQUpdateRequest {
    id: number;                      // Unique identifier for the question
    questionText: string;            // The question text
    difficultyLevel: string;         // Difficulty level of the question
    options: MCQOptionRequest[];     // List of options for the MCQ
}

// Cover Point Request Interface
export interface CoverPointRequest {
    coverPointText: string; // Text of the covering point
    marks: number;           // Marks for the covering point
}

// Essay Update Request Interface
export interface EssayUpdateRequest {
    id: number;                     // Unique identifier for the essay question
    questionText: string;           // The essay question text
    difficultyLevel: string;        // Difficulty level of the question
    coveringPoints: CoverPointRequest[]; // List of covering points for the essay
}

export interface QuestionSequenceRequest {
    questionIds: number[];
}



export interface QuestionSequenceResponse {
    questionIds: number[]; // Adjust this according to your actual response structure
}

export interface GradeRequest {
    gradingString: string; 
    minMarks: number;      
    maxMarks: number;     
}

export interface GradeResponse {
    id: number;
    gradingString: string; 
    minMarks: number;      
    maxMarks: number;     
}

export interface OrderChangeRequest {
    orderType: string;
    value: number;
}

export interface OrderResponse {
    orderType: string;
    value: number;
}
