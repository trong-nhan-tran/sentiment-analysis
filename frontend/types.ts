export type SentimentResult = {
  sentiment: string;
  probabilities: {
    positive: number;
    neutral: number;
    negative: number;
  };
};
