import { AxiosResponse } from 'axios';
import api from '../config';
import { ModerateExamResponse } from '../types';
import {
  CandidateResponse,
  ExamResponse,
  GenericAddOrUpdateResponse,
  OrganizationResponse,
} from '../types';

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

export const getModeratingExams = (
  examSetterId: number
): Promise<AxiosResponse<ModerateExamResponse[] | null>> => {
  return api.get<ModerateExamResponse[] | null>(
    `/exam-setter/${examSetterId}/moderating-exams`
  );
};
export const getProctoringExams = (
  proctorId: number,
  organizationId: number
): Promise<AxiosResponse<ExamResponse[]>> => {
  return api.get<ExamResponse[]>(
    `/exam-setter/proctor/${proctorId}/${organizationId}`
  );
};

export const getProctoringCandidates = (
  examId: number
): Promise<AxiosResponse<CandidateResponse[]>> => {
  return api.get<CandidateResponse[]>(`/exam-setter/${examId}/candidates`);
};

export const addProctorComment = (
  candidateId: number,
  examId: number,
  content: string
): Promise<AxiosResponse<any>> => {
  return api.post<any>(
    `/exam-setter/${candidateId}/${examId}/proctorComments`,
    content
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
