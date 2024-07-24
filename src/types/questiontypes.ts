// Interfaces for Candidate Exam View

export interface McqQuestion {
    question: string;
    options: string[];
}

export interface EssayQuestion {
    question: string;
    length: number;
}

// A union type for the questions
export type Question = McqQuestion | EssayQuestion;