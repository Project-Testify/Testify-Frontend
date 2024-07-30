import api from "../config";
import { AxiosResponse } from "axios";

interface Group {
    name: string;
    description: string;
    emails: string[];
}

export const createGroup = (group: Group): Promise<AxiosResponse> => {
    return api.post('/group/create', group);
};

