import Question from "@/components/forms/interfaces/question.interface";
export interface FormBasicInfo {
  id: string;
  title: string;
  slug: string;
  description: string;
  isPublished: boolean;
  questions: Question[];
}
