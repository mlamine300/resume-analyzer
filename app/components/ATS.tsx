import type { feedbackDetails } from "~/types";

const ATS = ({ ats }: { ats: feedbackDetails }) => {
  const icon =
    ats.score < 50
      ? "/public/icons/ats-bad.svg"
      : ats.score < 70
        ? "/public/icons/ats-warning.svg"
        : "/public/icons/ats-good.svg";

  const badgeColor =
    ats.score < 50
      ? "bg-badge-red"
      : ats.score < 70
        ? "bg-badge-yellow"
        : "bg-badge-green";
  const textColor =
    ats.score < 50
      ? "text-badge-red-text"
      : ats.score < 70
        ? "text-badge-yellow-text"
        : "text-badge-green-text";

  return (
    <div className={`w-full flex flex-col gap-4 p-8  ${badgeColor} rounded-lg`}>
      <div className="flex flex-row items-center gap-2">
        <img src={icon} alt="ats" className="w-8 h-8 bg-cover" />
        <p className="text-2xl font-semibold !text-black">{`ATS Score - ${ats.score}/100`}</p>
      </div>
      <p className="text-xl font-medium text-black">
        How well does your resume pass through Applicant Tracking Systems?
      </p>
      <p className="text-lg text-dark-200">
        Your resume was scanned like an employer would. Here's how it performed:
      </p>
      {ats.tips.map((tip, index) => (
        <div
          key={index}
          className="w-full flex flex-row gap-4 items-center bg-white/70 rounded-lg p-4"
        >
          <img
            src={
              tip.type === "good"
                ? "/public/icons/check.svg"
                : "/public/icons/warning.svg"
            }
            alt={tip.type}
          />
          <p className="text-lg text-dark-200">{tip.tip}</p>
        </div>
      ))}
      <p className="text-lg text-dark-200">
        Want a better score? Improve your resume by applying the suggestions
        listed below.
      </p>
    </div>
  );
};

export default ATS;
