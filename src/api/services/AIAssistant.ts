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