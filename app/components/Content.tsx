import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score < 50
      ? "bg-badge-red"
      : score < 70
        ? "bg-badge-yellow"
        : "bg-badge-green";
  const textColor =
    score < 50
      ? "text-badge-red-text"
      : score < 70
        ? "text-badge-yellow-text"
        : "text-badge-green-text";
  return (
    <div
      className={`flex flex-row justify-center  items-center gap-2 ${badgeColor} rounded-xl px-2 `}
    >
      <img src="/public/icons/i.svg" alt="i" />
      <p className={`text-sm font-medium ${textColor}`}>{score}/100</p>
    </div>
  );
};

const Content = ({ feedback }: { feedback: any }) => {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <Accordion>
        <AccordionItem id="toneAndStyle">
          <AccordionHeader itemId="toneAndStyle" iconPosition="right">
            <div className="flex flex-cols gap-8 items-center">
              <p className="text-2xl font-semibold !text-black">Tone & Style</p>
              <ScoreBadge score={feedback.toneAndStyle.score} />
            </div>
          </AccordionHeader>
          <AccordionContent itemId="toneAndStyle" className="bg-white">
            <p>This is the content of section 1.</p>
          </AccordionContent>
        </AccordionItem>
        {/* -------------------------------- */}
        <AccordionItem id="Content">
          <AccordionHeader itemId="Content" iconPosition="right">
            <div className="flex flex-cols gap-8 items-center">
              <p className="text-2xl font-semibold !text-black">Content</p>
              <ScoreBadge score={feedback.content.score} />
            </div>
          </AccordionHeader>
          <AccordionContent itemId="Content" className="bg-white">
            <p>This is the content of section 2.</p>
          </AccordionContent>
        </AccordionItem>
        {/* -------------------------------- */}
        <AccordionItem id="Structure">
          <AccordionHeader itemId="Structure" iconPosition="right">
            <div className="flex flex-cols gap-8 items-center">
              <p className="text-2xl font-semibold !text-black">Structure</p>
              <ScoreBadge score={feedback.structure.score} />
            </div>
          </AccordionHeader>
          <AccordionContent itemId="Structure" className="bg-white">
            <p>This is the content of section 3.</p>
          </AccordionContent>
        </AccordionItem>
        {/* -------------------------------- */}
        <AccordionItem id="Skills">
          <AccordionHeader itemId="Skills" iconPosition="right">
            <div className="flex flex-cols gap-8 items-center">
              <p className="text-2xl font-semibold !text-black">Skills</p>
              <ScoreBadge score={feedback.skills.score} />
            </div>
          </AccordionHeader>
          <AccordionContent itemId="Skills" className="bg-white">
            <p>This is the content of section 4.</p>
          </AccordionContent>
        </AccordionItem>
        {/* -------------------------------- */}
        <AccordionItem id="improvementChecklist">
          <AccordionHeader itemId="improvementChecklist" iconPosition="right">
            <div className="flex flex-cols gap-8 items-center">
              <p className="text-2xl font-semibold !text-black">
                Resume Improvement Checklist
              </p>
            </div>
          </AccordionHeader>
          <AccordionContent itemId="improvementChecklist" className="bg-white">
            <p>This is the content of section 5.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Content;
