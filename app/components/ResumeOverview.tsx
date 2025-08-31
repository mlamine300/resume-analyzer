import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const ResumeOverview = ({ feedback }: { feedback: any }) => {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-row gap-4">
        <ScoreGauge score={feedback.overallScore || 0} />
        <div className="flex flex-col justify-center gap-2">
          <p className="text-3xl text-black font-bold">Your Resume Score</p>
          <p className="text-md text-gray-600">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-row  items-center bg-badge-white gap-4 bg- rounded-lg p-4  my-4 ">
          <p className="text-2xl font-medium text-dark-200">tone & Style</p>
          <ScoreBadge score={feedback.toneAndStyle.score} />

          <p className="text-2xl font-medium text-dark-200 ml-auto">
            <span
              className={
                feedback.toneAndStyle.score < 50
                  ? "text-red-600"
                  : feedback.toneAndStyle.score < 70
                    ? "text-yellow-600"
                    : "text-green-600"
              }
            >
              {feedback.toneAndStyle.score || 0}
            </span>
            /100
          </p>
        </div>

        <div className="w-full flex flex-row  items-center bg-badge-white gap-4 bg- rounded-lg p-4 ">
          <p className="text-2xl font-medium text-dark-200">Content</p>
          <ScoreBadge score={feedback.content.score} />

          <p className="text-2xl font-medium text-dark-200 ml-auto">
            <span
              className={
                feedback.content.score < 50
                  ? "text-red-600"
                  : feedback.content.score < 70
                    ? "text-yellow-600"
                    : "text-green-600"
              }
            >
              {feedback.content.score || 0}
            </span>
            /100
          </p>
        </div>

        <div className="w-full flex flex-row  items-center bg-badge-white gap-4 bg- rounded-lg p-4 ">
          <p className="text-2xl font-medium text-dark-200">Structure</p>
          <ScoreBadge score={feedback.structure.score} />

          <p className="text-2xl font-medium text-dark-200 ml-auto">
            <span
              className={
                feedback.structure.score < 50
                  ? "text-red-600"
                  : feedback.structure.score < 70
                    ? "text-yellow-600"
                    : "text-green-600"
              }
            >
              {feedback.structure.score || 0}
            </span>
            /100
          </p>
        </div>

        <div className="w-full flex flex-row  items-center bg-badge-white gap-4 bg- rounded-lg p-4 ">
          <p className="text-2xl font-medium text-dark-200">Skills</p>
          <ScoreBadge score={feedback.skills.score} />

          <p className="text-2xl font-medium text-dark-200 ml-auto">
            <span
              className={
                feedback.skills.score < 50
                  ? "text-red-600"
                  : feedback.skills.score < 70
                    ? "text-yellow-600"
                    : "text-green-600"
              }
            >
              {feedback.skills.score || 0}
            </span>
            /100
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeOverview;
