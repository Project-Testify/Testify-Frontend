import api from "../config";
import { AxiosResponse } from "axios";



interface CoverPoint {
    coverPointText: string; // Description of the point to cover
    marks: number;         // Marks allocated to the point
  }
  
  interface GradeQuestionResponse {
    questionText: string;         // The main question text
    coverPoints: CoverPoint[];    // Array of cover points for the question
    userAnswer: string;           // User's answer for the question
  }


// /grade/<examID>/users/<userID>/essay-details
export const getEssayDetails = (examID: number, userID: number): Promise<AxiosResponse<GradeQuestionResponse[]>> => {
    return api.get(`/grade/${examID}/users/${userID}/essay-details`);
};

