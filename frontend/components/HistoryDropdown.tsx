import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SentimentResult } from "../types";

interface HistoryDropdownProps {
  showHistory: boolean;
  history: Array<{ text: string; result: SentimentResult }>;
  loadHistoryItem: (item: { text: string; result: SentimentResult }) => void;
  clearHistory: () => void;
  deleteHistoryItem: (index: number) => void;
}

export const HistoryDropdown: React.FC<HistoryDropdownProps> = ({
  showHistory,
  history,
  loadHistoryItem,
  clearHistory,
  deleteHistoryItem,
}) => {
  return (
    <AnimatePresence>
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 overflow-hidden"
        >
          <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
            {history.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Các phân tích gần đây
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Xóa tất cả
                  </button>
                </div>
                <ul className="space-y-2">
                  {history.map((item, index) => (
                    <li key={index} className="text-sm">
                      <div className="w-full p-2 rounded hover:bg-gray-100 flex items-start group">
                        <span className="mr-2">
                          {item.result.sentiment === "positive"
                            ? "😊"
                            : item.result.sentiment === "neutral"
                            ? "😐"
                            : "😞"}
                        </span>
                        <button
                          onClick={() => loadHistoryItem(item)}
                          className="truncate flex-1 text-left"
                        >
                          {item.text}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteHistoryItem(index);
                          }}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          title="Xóa mục này"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Chưa có phân tích nào được lưu
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
