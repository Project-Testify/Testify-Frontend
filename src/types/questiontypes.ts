// Interfaces for Candidate Exam View

interface McqOption {
    optionId: string;   // or number, depending on your data
    optionText: string;
    correct: boolean;   // or any other relevant property
    marks: number;      // or any other relevant property
  }

  export interface McqQuestion {
    questionText: string;
    options: McqOption[];
  }

export interface EssayQuestion {
    questionText: string;
    length: number;
}

// A union type for the questions
export type Question = McqQuestion | EssayQuestion;