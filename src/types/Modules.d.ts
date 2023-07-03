import { Status } from "../App";

type Question = {
  correctOption: number;
  options: string[];
  points: number;
  question: string;
};

export interface State {
  questions: Question[];
  status: Status;
  error: string;
}
