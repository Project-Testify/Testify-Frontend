import api from '../config';
import { AxiosResponse } from 'axios';
import { GenericAddOrUpdateResponse, ExamRequest, MCQRequest, ExamResponse, FetchQuestionsResponse, EssayRequest, GenericDeleteResponse, GenericResponse, CandidateResponse } from '../types';
import {
    EssayUpdateRequest,
    MCQUpdateRequest,
    QuestionSequenceRequest,
    QuestionSequenceResponse,
    GradeRequest,
    OrderChangeRequest,
    OrderResponse,
    ProctorResponse,
    ExamSetterSearchResponse,
    CandidateGroupSearchResponse,
    CandidateEmailListRequest,
    ConflictExamResponse,
    CandidateConflictExamResponse,
    RealTimeMonitoringRequest,
    RealTimeMonitoringResponse,
    BrowserLockdownResponse,
    ModeratorResponse,
    HostedResponse,
    ModeratorRequest,
    QuestionCommentRequest

} from '../examServiceTypes';


export const saveExamInformation = (examRequest: ExamRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>('/exam', examRequest);
}

export const updateExamInformation = (examId: number, examRequest: ExamRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}`, examRequest);
}

// Add MCQ
export const addMCQ = (examId: number, mcqRequest: MCQRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/mcq`, mcqRequest);
}

export const updateMCQQuestion = (examId: number, mcqUpdateRequest: MCQUpdateRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/mcq`, mcqUpdateRequest);
}

export const addEssay = (examId: number, essayRequest: EssayRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/essay`, essayRequest);
}

export const updateEssayQuestion = (examId: number, essayUpdateRequest: EssayUpdateRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/essay`, essayUpdateRequest);
}

export const getExamInformation = (examId: number): Promise<AxiosResponse<ExamResponse>> => {
    return api.get<ExamResponse>(`/exam/${examId}`);
};

export const fetchQuestions = (examId: number): Promise<AxiosResponse<FetchQuestionsResponse>> => {
    return api.get<FetchQuestionsResponse>(`/exam/${examId}/questions`);
};

export const deleteQuestion = (questionId: number): Promise<AxiosResponse<GenericDeleteResponse>> => {
    return api.put<GenericDeleteResponse>(`exam/question/${questionId}`);
};

export const updateQuestionSequence = (examId: number, questionIds: number[]): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    const requestBody: QuestionSequenceRequest = { questionIds }; // Create the request body
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/questionSequence`, requestBody);
};

export const getQuestionSequence = (examId: number): Promise<AxiosResponse<QuestionSequenceResponse>> => {
    return api.get<QuestionSequenceResponse>(`/exam/${examId}/questionSequence`);
};

export const saveGrades = (examId: number, grades: GradeRequest[]): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/grades`, grades);
};

export const fetchGrades = (examId: number): Promise<AxiosResponse<GradeRequest[]>> => {
    return api.get<GradeRequest[]>(`/exam/${examId}/grades`);
}

export const updateGrades = (examId: number, gradeRequests: GradeRequest[]): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.put<GenericAddOrUpdateResponse>(`/exam/${examId}/grades`, gradeRequests);
};

export const updateOrder = (examId: number, orderChangeRequest: OrderChangeRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/order`, orderChangeRequest);
}

export const getExamOrder = (examId: number): Promise<AxiosResponse<OrderResponse>> => {
    return api.get<OrderResponse>(`/exam/${examId}/order`);
}

export const addOrUpdateProctors = (examId: number, emails: string[]): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/proctors`, emails);
};


export const getProctors = (examId: number): Promise<AxiosResponse<ProctorResponse[]>> => {
    return api.get<ProctorResponse[]>(`/exam/${examId}/proctors`);
}

export const getExamSettersForSearch = (organizationId: number): Promise<AxiosResponse<ExamSetterSearchResponse[]>> => {
    return api.get<ExamSetterSearchResponse[]>(`/organization/${organizationId}/search-exam-setters`);
}

export const getCandidateGroupsByOrganizationForSearch = (organizationId: number): Promise<AxiosResponse<CandidateGroupSearchResponse[]>> => {
    return api.get<CandidateGroupSearchResponse[]>(`/organization/${organizationId}/candidate-groups-search`);
}

export const updateExamCandidates = (examId: number, candidateEmails: CandidateEmailListRequest): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>(`/exam/${examId}/update-candidates`, candidateEmails);
}

export const getAllCandidatesForSearch = (): Promise<AxiosResponse> => {
    return api.get<CandidateResponse[]>(`/candidate/search`);
}

export const getExamCandidates = (examId: number): Promise<AxiosResponse<CandidateResponse[]>> => {
    return api.get<CandidateResponse[]>(`/exam/${examId}/candidates`);
}

export const getConflictingExams = (examId: number): Promise<AxiosResponse<ConflictExamResponse[]>> => {
    return api.get<ConflictExamResponse[]>(`/exam/${examId}/conflicting-exams`);
};

export const getCandidateConflictingExams = (examId: number): Promise<AxiosResponse<CandidateConflictExamResponse[]>> => {
    return api.get<CandidateConflictExamResponse[]>(`/exam/${examId}/conflicting-candidates`);
};

export const updateRealTimeMonitoring = (
    examId: number,
    dto: RealTimeMonitoringRequest
): Promise<AxiosResponse<GenericResponse>> => {
    return api.put<GenericResponse>(`/exam/${examId}/real-time-monitoring`, dto);
};

export const getRealTimeMonitoringStatus = (
    examId: number
): Promise<AxiosResponse<RealTimeMonitoringResponse>> => {
    return api.get<RealTimeMonitoringResponse>(`/exam/${examId}/real-time-monitoring`);
};

export const updateBrowserLockdown = (
    examId: number,
    browserLockdown: boolean
): Promise<AxiosResponse<GenericResponse>> => {
    return api.put<GenericResponse>(`/exam/${examId}/browser-lockdown`, null, {
        params: { browserLockdown },
    });
};

export const getBrowserLockdownStatus = (
    examId: number
): Promise<AxiosResponse<BrowserLockdownResponse>> => {
    return api.get<BrowserLockdownResponse>(`/exam/${examId}/browser-lockdown`);
};

export const updateHostedStatus = (
    examId: number,
    hosted: boolean
): Promise<AxiosResponse<GenericResponse>> => {
    return api.put<GenericResponse>(`/exam/${examId}/hosted`, null, {
        params: { hosted },
    });
};

export const getHostedStatus = (
    examId: number
): Promise<AxiosResponse<HostedResponse>> => {
    return api.get<HostedResponse>(`/exam/${examId}/hosted`);
};

export const setModerator = (
    examId: number,
    email: string
): Promise<AxiosResponse<string>> => {
    const moderatorRequest: ModeratorRequest = {
        moderatorEmail: email,
    };
    return api.post<string>(`/exam/${examId}/set-moderator`, moderatorRequest);
};

export const getModerator = (
    examId: number
): Promise<AxiosResponse<ModeratorResponse>> => {
    return api.get<ModeratorResponse>(`/exam/${examId}/moderator`);
};

export const updateQuestionComment = (
    request: QuestionCommentRequest
): Promise<AxiosResponse<GenericAddOrUpdateResponse>> => {
    return api.post<GenericAddOrUpdateResponse>("/exam/question/comment", request);
};