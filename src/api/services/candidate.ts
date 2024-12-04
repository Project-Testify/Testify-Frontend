import api from "../config";
import { AxiosResponse } from "axios";

import { Exam } from "../../types";

export const getCandidateExams = (): Promise<AxiosResponse<Exam>> => {
    return api.get<Exam>('/candidate/exams')
};