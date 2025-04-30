import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Phân tích cảm xúc bình luận
      </h1>
      <p>Nhận diện cảm xúc bình luận tiếng Việt bằng PhoBERT</p>
    </header>
  );
};
