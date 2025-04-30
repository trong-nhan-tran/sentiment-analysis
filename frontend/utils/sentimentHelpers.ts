import { SentimentResult } from "../types";

export const getSentimentEmoji = (result: SentimentResult | null): string => {
  if (!result) return "";
  switch (result.sentiment) {
    case "positive":
      return "😊";
    case "neutral":
      return "😐";
    case "negative":
      return "😞";
    default:
      return "";
  }
};

export const getSentimentText = (result: SentimentResult | null): string => {
  if (!result) return "";
  switch (result.sentiment) {
    case "positive":
      return "Tích cực";
    case "neutral":
      return "Trung tính";
    case "negative":
      return "Tiêu cực";
    default:
      return "";
  }
};

export const getSentimentColor = (result: SentimentResult | null): string => {
  if (!result) return "";
  switch (result.sentiment) {
    case "positive":
      return "text-emerald-500";
    case "neutral":
      return "text-gray-500";
    case "negative":
      return "text-red-500";
    default:
      return "";
  }
};

export const getSentimentGradient = (
  result: SentimentResult | null
): string => {
  if (!result) return "from-blue-500 to-indigo-600";
  switch (result.sentiment) {
    case "positive":
      return "from-emerald-400 to-emerald-600";
    case "neutral":
      return "from-gray-400 to-gray-600";
    case "negative":
      return "from-red-400 to-red-600";
    default:
      return "from-blue-500 to-indigo-600";
  }
};

export const getConfidenceLevel = (result: SentimentResult | null): string => {
  if (!result) return "";

  const maxProbability = Math.max(
    result.probabilities.positive,
    result.probabilities.neutral,
    result.probabilities.negative
  );

  if (maxProbability > 0.8) return "Độ tin cậy: Cao";
  if (maxProbability > 0.5) return "Độ tin cậy: Trung bình";
  return "Độ tin cậy: Thấp";
};
