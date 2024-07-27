// Types of questions for paper setter
export type QuestionType = "MCQ" | "ESSAY" | string;
export type Question = {
    id : number;
    questionType: QuestionType;
    type: QuestionType;
    questionText: string;
    options?: {
        optionText: string;
        marks: string;
        isCorrect?: boolean;
    }[];
    questionDifficulty: "easy" | "medium" | "hard";
    coveringPoints?: {
        coveringPointText: string;
        marks: string;
    }[];
}