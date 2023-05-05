export type DataSet = {
  question: string;
  answer: number;
  options: string[];
  questionOptions?: string[];
  questionDirection?: string;
};

export type Articles = {
  articleNo: string;
  article: string;
  part: string;
}