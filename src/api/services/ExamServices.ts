import api from '../config';
import { AxiosResponse } from 'axios';
import { GenericAddOrUpdateResponse, ExamRequest, MCQRequest, ExamResponse } from '../types';


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

export const getExamInformation = (examId: number): Promise<AxiosResponse<ExamResponse>> => {
    return api.get<ExamResponse>(`/exam/${examId}`);
};
