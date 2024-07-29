import api from "../config";
import { AxiosResponse } from "axios";

import { Response } from "../types";

export const getCandidate = (): Promise<AxiosResponse<Response>> => {
    return api.get<Response>('/candidate/1', );
};