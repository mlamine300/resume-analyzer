import React from "react";
import type { feedbackDetails } from "~/types";
const ContentBadge = ({ content }: { content: feedbackDetails }) => {
  return (
    <div className={`w-full flex flex-col gap-4 p-8  rounded-lg`}>
      <div className="flex justify-between flex-row items-center gap-y-4 flex-wrap bg-badge-white p-4 rounded-lg">
        {content.tips.map((tip, index) => (
          <div
            key={index}
            className="flex min-w-[40%] flex-row gap-4 items-center bg-white/70 rounded-lg p-4 "
          >
            <img
              src={
                tip.type === "good"
                  ? "/public/icons/check.svg"
                  : "/public/icons/warning.svg"
              }
              alt={tip.type}
              className="w-8 h-8 bg-cover"
            />
            <p className="text-sm text-dark-200">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {content.tips.map((tip, index) => {
          const theme =
            tip.type === "good"
              ? "bg-badge-green/20 text-badge-green-text border border-badge-green"
              : "bg-badge-yellow/20 text-badge-yellow-text border border-badge-yellow";
          const img =
            tip.type === "good"
              ? "/public/icons/check.svg"
              : "/public/icons/warning.svg";

          return (
            <div
              className={theme + " p-4 rounded-lg flex flex-col"}
              key={index}
            >
              <div className="flex flex-row items-center">
                <img
                  src={img}
                  alt={tip.type}
                  className="w-8 h-8 bg-cover mr-4"
                />
                <p className="text-lg my-1 font-semibold">{tip.tip}</p>
              </div>

              <div className="ml-8 flex flex-row items-start">
                <span className="text-xl font-bold mr-2">&bull;</span>{" "}
                <p className=" text-[16px] font-normal">{tip.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentBadge;
