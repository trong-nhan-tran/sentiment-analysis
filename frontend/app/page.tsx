"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { InputForm } from "../components/InputForm";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { SentimentResult } from "../types";
import {
  getSentimentEmoji,
  getSentimentText,
  getSentimentColor,
  getSentimentGradient,
  getConfidenceLevel,
} from "../utils/sentimentHelpers";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<
    Array<{ text: string; result: SentimentResult }>
  >([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("analysisHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history:", e);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("analysisHistory", JSON.stringify(history));
    }
  }, [history]);

  const analyzeText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data);

      // Add to history
      const newEntry = { text, result: data };
      setHistory((prev) => [newEntry, ...prev.slice(0, 9)]); // Keep only the last 10 entries
    } catch (error) {
      console.error("Lỗi khi phân tích:", error);
      // Add error notification here
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = (item: { text: string; result: SentimentResult }) => {
    setText(item.text);
    setResult(item.result);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("analysisHistory");
  };

  const deleteHistoryItem = (index: number) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);

    // Update localStorage if needed
    if (newHistory.length > 0) {
      localStorage.setItem("analysisHistory", JSON.stringify(newHistory));
    } else {
      localStorage.removeItem("analysisHistory");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="container max-w-6xl mx-auto">
        <Header />

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <InputForm
            text={text}
            setText={setText}
            loading={loading}
            analyzeText={analyzeText}
            history={history}
            loadHistoryItem={loadHistoryItem}
            clearHistory={clearHistory}
            deleteHistoryItem={deleteHistoryItem}
            getSentimentGradient={() => getSentimentGradient(result)}
            result={result}
          />

          <ResultsDisplay
            result={result}
            getSentimentEmoji={() => getSentimentEmoji(result)}
            getSentimentText={() => getSentimentText(result)}
            getSentimentColor={() => getSentimentColor(result)}
            getConfidenceLevel={() => getConfidenceLevel(result)}
          />
        </div>
      </div>
    </main>
  );
}
