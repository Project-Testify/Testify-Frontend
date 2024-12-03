import api from '../config';
import { AxiosResponse } from 'axios';
import { InviteExamSetterRequest, GenericAddOrUpdateResponse, ExamResponse} from '../types';

export const addExamSetterService = (
    organizationId: number,
    inviteExamSetterRequest: InviteExamSetterRequest
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/organization/${organizationId}/invite-exam-setter`, inviteExamSetterRequest);
};

export const getInvitations = (organizationId: number): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/organization/${organizationId}/invitations`);
};

export const getExamSetters = (organizationId: number): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/organization/${organizationId}/examSetters`);
};

export const getExams = (organizationId: number): Promise<AxiosResponse<ExamResponse[]>> => {
    return api.get<ExamResponse[]>(`/organization/${organizationId}/exams`);
}

export const getExamCandidateGradeData =() : Promise<AxiosResponse<any>> => {
    return api.get<any>(`/grade/getExamCandidateGrade`);
}

