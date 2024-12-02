import { assistantApi } from "../config";
import { AxiosResponse } from "axios";
import { Response } from "../types";


// types

interface GenerateEssayQuestionRequest {
    text: string;
    examid: string;
}

export interface EssayQuestionResponse {
    question: string;
    valid_answers: string[];
  }


export interface GenerateMCQQuestionRequest {
    text: string;
    examid: string;
    choices: number;
}   
export interface MCQQuestionResponse {
    question: string;
    options: string[];
    correct_answer: string;
}


export interface GenerateMCQQuestionListRequest {
    text: string;
    examid: string;
    choices: number;
    num_questions: number;
}

interface Option {
    optionText: string;
    marks: number;
    correct: boolean;
  }
  
  interface Question {
    questionText: string;
    difficultyLevel: string;
    options: Option[];
  }
  
  interface MCQQuestionListResponse {
    success: boolean;
    questions: Question[];
  }


//   eassy list
export interface GenerateEssayQuestionListRequest {
    text: string;
    examid: string;
    num_questions: number;
}

interface CoveringPoints {
    coveringPointText: string;
    marks: number;
}
interface Question {
    questionText: string;
    difficultyLevel: string;
    coveringPoints: CoveringPoints[];
  }
  
  interface EssayQuestionListResponse {
    success: boolean;
    questions: Question[];  

}

  
export interface GradeQuestionRequest {
    question: string;
    answer: string;
    valid_points: string[];
}

export interface GradeQuestionResponse {
    correct_points: string[];
    incorrect_points: string[];
}


// upload file to AI assistant
export const uploadFiles = (files: File[], examId: string): Promise<AxiosResponse<Response>> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);  // Append each file under the same key 'files'
    });
    // formData.append('examid', examId);  // Add examId to the form data

    // return assistantApi.post<Response>('/upload-pdf', formData);
    return assistantApi.post<Response>('/upload-pdf/?examid=' + examId, formData);
};


// Question Generation
// essay question generation

export const generateEssayQuestion = (data: GenerateEssayQuestionRequest): Promise<AxiosResponse<EssayQuestionResponse>> => {
    return assistantApi.post<EssayQuestionResponse>('/generate-question/essay/', data);
};


// mcq question generation
export const generateMCQQuestion = (data: GenerateMCQQuestionRequest): Promise<AxiosResponse<MCQQuestionResponse>> => {
    return assistantApi.post<MCQQuestionResponse>('/generate-question/mcq/', data);
};


// mcq question list generation
export const generateMCQQuestionList = (data: GenerateMCQQuestionListRequest): Promise<AxiosResponse<MCQQuestionListResponse>> => {
    return assistantApi.post<MCQQuestionListResponse>('/generate-questions/mcq/', data);
};


export const generateEssayQuestionList = (data: GenerateEssayQuestionListRequest): Promise<AxiosResponse<EssayQuestionListResponse>> => {
    return assistantApi.post<EssayQuestionListResponse>('/generate-questions/essay/', data);

export const gradeQuestion = (data: GradeQuestionRequest): Promise<AxiosResponse<GradeQuestionResponse>> => {
    return assistantApi.post<GradeQuestionResponse>('/grade/', data);  // Send the data to the backend

}