import api from '../config';
import { AxiosResponse } from 'axios';


// export const getExamSettersService = (organizationId: number): Promise<AxiosResponse<any>> => {
//     return api.get<any>(`/api/v1/organization/${organizationId}/exam-setters`);
// };

export const getUserRegistarationStats = () : Promise<AxiosResponse<any>> => {
    return api.get<any>('/report/registrations');
}

// get user role stats
export const getUserRoleStats = () : Promise<AxiosResponse<any>> => {
    return api.get<any>('/report/roleStats');
}

