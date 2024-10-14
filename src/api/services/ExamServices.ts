import api from '../config';
import { AxiosResponse } from 'axios';
import { GenericAddOrUpdateResponse, ExamRequest, MCQRequest } from '../types';


export const saveExamInformation = (examRequest: ExamRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>('/exam', examRequest);
}

// Add MCQ
export const addMCQ = (examId: number, mcqRequest: MCQRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/mcq`, mcqRequest);
}
