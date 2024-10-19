import api from '../config';
import { AxiosResponse } from 'axios';
import { GenericAddOrUpdateResponse, ExamRequest, MCQRequest, ExamResponse, FetchQuestionsResponse, EssayRequest, GenericDeleteResponse } from '../types';
import { EssayUpdateRequest, MCQUpdateRequest, QuestionSequenceRequest, QuestionSequenceResponse } from '../examServiceTypes'; 


export const saveExamInformation = (examRequest: ExamRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>('/exam', examRequest);
}

export const updateExamInformation = (examId: number, examRequest: ExamRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}`, examRequest);
}

// Add MCQ
export const addMCQ = (examId: number, mcqRequest: MCQRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/mcq`, mcqRequest);
}

export const updateMCQQuestion = (examId: number, mcqUpdateRequest: MCQUpdateRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/mcq`, mcqUpdateRequest);
}

export const addEssay = (examId: number, essayRequest: EssayRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/essay`, essayRequest);
}

export const updateEssayQuestion = (examId: number, essayUpdateRequest: EssayUpdateRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/essay`, essayUpdateRequest);
}

export const getExamInformation = (examId: number): Promise<AxiosResponse<ExamResponse>> => {
    return api.get<ExamResponse>(`/exam/${examId}`);
};

export const fetchQuestions = (examId: number): Promise<AxiosResponse<FetchQuestionsResponse>> => {
    return api.get<FetchQuestionsResponse>(`/exam/${examId}/questions`);
};

export const deleteQuestion = (questionId: number): Promise<AxiosResponse<GenericDeleteResponse>> => {
    return api.put<GenericDeleteResponse>(`exam/question/${questionId}`);
};

export const updateQuestionSequence = (examId: number, questionIds: number[]): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    const requestBody: QuestionSequenceRequest = { questionIds }; // Create the request body
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/questionSequence`, requestBody);
};

export const getQuestionSequence = (examId: number): Promise<AxiosResponse<QuestionSequenceResponse>> => {
    return api.get<QuestionSequenceResponse>(`/exam/${examId}/questionSequence`);
};