import React, { useRef } from "react";
import { Pie } from "react-chartjs-2";
import { SentimentResult } from "../types";
import { motion } from "framer-motion";

interface SentimentChartProps {
  result: SentimentResult;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ result }) => {
  const chartRef = useRef<any>(null);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = parseFloat(context.raw).toFixed(2);
            return `${label}: ${value}%`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: "#fff",
      },
    },
  };

  const chartData = {
    labels: ["Tích cực", "Trung tính", "Tiêu cực"],
    datasets: [
      {
        data: [
          result.probabilities.positive * 100,
          result.probabilities.neutral * 100,
          result.probabilities.negative * 100,
        ],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)", // Tích cực - xanh lá với độ trong suốt
          "rgba(107, 114, 128, 0.8)", // Trung tính - xám với độ trong suốt
          "rgba(239, 68, 68, 0.8)", // Tiêu cực - đỏ với độ trong suốt
        ],
        hoverBackgroundColor: [
          "rgba(16, 185, 129, 1)", // Tích cực - solid khi hover
          "rgba(107, 114, 128, 1)", // Trung tính - solid khi hover
          "rgba(239, 68, 68, 1)", // Tiêu cực - solid khi hover
        ],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-48 w-48 mx-auto">
      <Pie data={chartData} options={chartOptions} ref={chartRef} />
    </div>
  );
};

export const ProbabilityBars: React.FC<SentimentChartProps> = ({ result }) => {
  return (
    <div className="space-y-4 mt-auto">
      {[
        {
          label: "Tích cực",
          value: result.probabilities.positive,
          color: "bg-emerald-500",
          textColor: "text-emerald-700",
        },
        {
          label: "Trung tính",
          value: result.probabilities.neutral,
          color: "bg-gray-500",
          textColor: "text-gray-700",
        },
        {
          label: "Tiêu cực",
          value: result.probabilities.negative,
          color: "bg-red-500",
          textColor: "text-red-700",
        },
      ].map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${item.textColor}`}>
              {item.label}
            </span>
            <span className="text-sm font-medium">
              {(item.value * 100).toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className={`h-2.5 rounded-full ${item.color}`}
              initial={{ width: "0%" }}
              animate={{ width: `${item.value * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};
