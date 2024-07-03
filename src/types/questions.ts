// make types for questions
export type QuestionType = "MCQ" | "ESSAY" | string;
export type Question = {
    questionType: QuestionType;
    type: QuestionType;
    questionText: string;
    options?: {
        optionText: string;
        marks: string;
        isCorrect?: boolean;
    }[];
    coveringPoints?: {
        coveringPointText: string;
        marks: string;
    }[];
}