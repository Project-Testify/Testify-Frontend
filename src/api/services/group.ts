import api from "../config";
import { AxiosResponse } from "axios";

interface Group {
    name: string;
    //description: string;
    emails: string[];
}

export const createGroup = (group: Group, organizationId: number): Promise<AxiosResponse> => {
    return api.post(`/organization/${organizationId}/candidate-group`, group);
};

export const getGroups = (organizationId: number): Promise<AxiosResponse> => {
    
    return api.get(`/organization/${organizationId}/candidate-group`);
};

export const addCandidateToGroup = (name:string, email:string, groupId:number): Promise<AxiosResponse> => {
    return api.post(`/organization/${groupId}/add-candidate?name=${name}&email=${email}`);
};

export const deleteGroup = (groupId:number): Promise<AxiosResponse> => {
    return api.delete(`/organization/${groupId}/delete-group`);
};

export const deleteCandidate = (groupId:number, candidateId:number): Promise<AxiosResponse> => {
    return api.delete(`/organization/${groupId}/delete-candidate?candidateId=${candidateId}`);
};

export const updateGroup = (groupId:number, groupName:string): Promise<AxiosResponse> => {
    return api.put(`/organization/${groupId}/update-candidateGroup?groupName=${groupName}`);
};

