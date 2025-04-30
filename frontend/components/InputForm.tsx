import React, { useState } from "react";
import { motion } from "framer-motion";
import { SentimentResult } from "../types";
import { HistoryDropdown } from "./HistoryDropdown";

interface InputFormProps {
  text: string;
  setText: (text: string) => void;
  loading: boolean;
  analyzeText: (e: React.FormEvent) => Promise<void>;
  history: Array<{ text: string; result: SentimentResult }>;
  loadHistoryItem: (item: { text: string; result: SentimentResult }) => void;
  clearHistory: () => void;
  deleteHistoryItem: (index: number) => void;
  getSentimentGradient: () => string;
  result: SentimentResult | null;
}

export const InputForm: React.FC<InputFormProps> = ({
  text,
  setText,
  loading,
  analyzeText,
  history,
  loadHistoryItem,
  clearHistory,
  deleteHistoryItem,
  getSentimentGradient,
  result,
}) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 flex-1 backdrop-blur-sm bg-white/95 border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Văn bản đầu vào</h2>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Lịch sử
        </button>
      </div>

      <HistoryDropdown
        showHistory={showHistory}
        history={history}
        loadHistoryItem={loadHistoryItem}
        clearHistory={clearHistory}
        deleteHistoryItem={deleteHistoryItem}
      />

      <form onSubmit={analyzeText} className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="text" className="block font-medium text-gray-700">
              Nhập văn bản cần phân tích:
            </label>
            <span className="text-xs text-gray-500">{text.length} ký tự</span>
          </div>
          <div className="relative">
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[160px] resize-none"
              id="text"
              placeholder="Nhập nội dung..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            {text && (
              <button
                type="button"
                onClick={() => setText("")}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Clear text"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || text.trim().length === 0}
            className={`w-full bg-gradient-to-r ${getSentimentGradient()} text-white font-medium py-3 px-4 rounded-xl shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Đang phân tích...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Phân tích ngay</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
