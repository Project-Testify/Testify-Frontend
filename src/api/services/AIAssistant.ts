import { assistantApi } from "../config";
import { AxiosResponse } from "axios";
import { Response } from "../types";


// upload file to AI assistant
export const uploadFiles = (files: File[], examId: string): Promise<AxiosResponse<Response>> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);  // Append each file under the same key 'files'
    });
    // formData.append('examid', examId);  // Add examId to the form data

    // return assistantApi.post<Response>('/upload-pdf', formData);
    return assistantApi.post<Response>('/upload-pdf/?examid=' + examId, formData);
};


