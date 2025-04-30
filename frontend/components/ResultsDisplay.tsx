import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SentimentResult } from "../types";
import { SentimentChart, ProbabilityBars } from "./SentimentChart";

interface ResultsDisplayProps {
  result: SentimentResult | null;
  getSentimentEmoji: () => string;
  getSentimentText: () => string;
  getSentimentColor: () => string;
  getConfidenceLevel: () => string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  getSentimentEmoji,
  getSentimentText,
  getSentimentColor,
  getConfidenceLevel,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 h-full backdrop-blur-sm bg-white/95 border border-gray-100 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
              Kết quả phân tích
            </h2>

            <div className="flex items-center justify-center mb-6 gap-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="text-6xl"
              >
                {getSentimentEmoji()}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">
                  Cảm xúc:{" "}
                  <span className={getSentimentColor()}>
                    {getSentimentText()}
                  </span>
                </h3>
                <p className="text-gray-700 mt-1">{getConfidenceLevel()}</p>
              </div>
            </div>

            <div className="mb-6 flex-grow flex items-center justify-center">
              <SentimentChart result={result} />
            </div>

            <ProbabilityBars result={result} />
          </motion.div>
        ) : (
          <ResultsPlaceholder />
        )}
      </AnimatePresence>
    </div>
  );
};

const ResultsPlaceholder: React.FC = () => {
  return (
    <motion.div
      key="placeholder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 h-full flex flex-col items-center justify-center backdrop-blur-sm bg-white/95 border border-gray-100"
    >
      <div className="text-center max-w-md mx-auto">
        <div className="bg-blue-50 rounded-full p-5 w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Kết quả sẽ hiển thị tại đây
        </h2>
        <p className="text-gray-600">
          Nhập văn bản vào ô bên trái và nhấn nút "Phân tích ngay" để xác định
          cảm xúc.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
              <span className="text-emerald-500 text-lg">😊</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Tích cực</h3>
              <p className="text-sm text-gray-500">
                Phát hiện cảm xúc tích cực trong bình luận
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <span className="text-gray-500 text-lg">😐</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Trung tính</h3>
              <p className="text-sm text-gray-500">
                Phát hiện cảm xúc trung tính trong bình luận
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <span className="text-red-500 text-lg">😞</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Tiêu cực</h3>
              <p className="text-sm text-gray-500">
                Phát hiện cảm xúc tiêu cực trong bình luận
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
