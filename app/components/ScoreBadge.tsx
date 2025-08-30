import React from "react";

const ScoreBadge = ({ score }: { score: number }) => {
  type info = {
    color: string;
    textColor: string;
    message: string;
  };
  let info: info = {
    color: "badge-green",
    textColor: "badge-green-text",
    message: "Strong",
  };
  if (score < 70 && score >= 50) {
    /**--color-badge-green: #d5faf1;
  --color-badge-red: #f9e3e2;
  --color-badge-yellow: #fceed8; */
    info = {
      color: "badge-yellow",
      textColor: "badge-yellow-text",
      message: "Good Start",
    };
  } else if (score < 50) {
    info = {
      color: "badge-red",
      textColor: "badge-red-text",
      message: "Needs Improvement",
    };
  }
  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium    bg-${info.color} text-${info.textColor}`}
    >
      {info.message}
    </div>
  );
};

export default ScoreBadge;
