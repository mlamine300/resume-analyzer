export type Resume = {
  id: string;
  companyName: string;
  jobTitle: string;
  imagePath: string;
  resumePath: string;
  feedback: any;
  createdAt?: string;
};

export type feedbackDetails = {
  score: number;
  tips: {
    type: "good" | "improve";
    tip: string;
    explanation?: string;
  }[];
};
