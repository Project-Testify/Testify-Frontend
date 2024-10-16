import api from '../config';
import { AxiosResponse } from 'axios';
import { GenericAddOrUpdateResponse, ExamRequest, MCQRequest, ExamResponse, FetchQuestionsResponse, EssayRequest, GenericDeleteResponse } from '../types';


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

export const addEssay = (examId: number, essayRequest: EssayRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/essay`, essayRequest);
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
