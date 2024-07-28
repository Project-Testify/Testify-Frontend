import api from '../config';
import { AxiosResponse } from 'axios';
import { InviteExamSetterRequest, GenericAddOrUpdateResponse } from '../types';

export const addExamSetterService = (
    organizationId: number,
    inviteExamSetterRequest: InviteExamSetterRequest
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/organization/${organizationId}/invite-exam-setter`, inviteExamSetterRequest);
};