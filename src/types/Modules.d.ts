import { Status } from "../App";

export type Question = {
  correctOption: number;
  options: string[];
  points: number;
  question: string;
};

export interface State {
  questions: Question[];
  status: Status;
  error: string;
  index: number;
  answer: number | null;
  points: number;
  time: number;
  highscore: number;
}
