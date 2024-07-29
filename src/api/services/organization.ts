import api from '../config';
import { AxiosResponse } from 'axios';
import { InviteExamSetterRequest, GenericAddOrUpdateResponse } from '../types';

export const addExamSetterService = (
    organizationId: number,
    inviteExamSetterRequest: InviteExamSetterRequest
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/organization/${organizationId}/invite-exam-setter`, inviteExamSetterRequest);
};

export const getInvitationsService = (organizationId: number): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/api/v1/organization/${organizationId}/invitations`);
};

export const getExamSettersService = (organizationId: number): Promise<AxiosResponse<any>> => {
    return api.get<any>(`/api/v1/organization/${organizationId}/exam-setters`);
};