import { AxiosResponse } from 'axios';
import api from '../config';
import { GenericAddOrUpdateResponse, OrganizationResponse } from '../types';

export const getExamSetterOrganizations = (
  setterId: number
): Promise<AxiosResponse<OrganizationResponse[]>> => {
  return api.get<OrganizationResponse[]>(
    `/exam-setter/${setterId}/getOrganizations`
  );
};

export const checkSetterRegistration = (
  token: string
): Promise<AxiosResponse<number>> => {
  return api.get<number>(`/exam-setter/${token}/checkSetterRegistration`);
};

export const addExamSetter = (
  token: string
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
  return api.post<GenericAddOrUpdateResponse>(
    `/exam-setter/${token}/addSetterToOrganization`
  );
};

export const removeExamSetterFromOrganization = (
  setterId: number,
  orgId: number
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
  return api.put<GenericAddOrUpdateResponse>(
    `/exam-setter/${setterId}/${orgId}/deleteSetter`
  );
};
