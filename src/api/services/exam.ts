import api from "../config";
import { AxiosResponse } from "axios";
import { Exam, Response } from "../types";


export const createExam = (exam: Exam): Promise<AxiosResponse<Response>> => {
    return api.post<Response>('/exam', exam);
};