import React, { useEffect, useState } from "react";
import type { Resume } from "~/types";
import ScoreCircle from "./ScoreCircle";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
      console.log(url);
    };

    loadResume();
  }, [resume.imagePath]);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="animate-in fade-in duration-1000  flex flex-col gap-8 bg-white rounded-2xl p-10 m-4 h-[560px] w-[350px] lg:w-[430px] xl:w-[490px]"
    >
      <div className="flex flex-row justify-between w-full h-fit items-center">
        <div className="flex flex-col mb-4 gap-2">
          <h2 className="!text-black !md:text-2xl !text-lg font-semibold ">
            {resume.companyName}{" "}
          </h2>
          <h2 className="md:pl-2 !md:text-lg !text-xs">{resume.jobTitle}</h2>
        </div>
        <div>
          <ScoreCircle score={resume.feedback.ATS.score} />
        </div>
      </div>
      <div className=" w-[250px] h-[301px] md:w-[380px] md:h-[402px] overflow-hidden rounded-2xl">
        <img
          src={resumeUrl}
          alt="resume"
          className=" object-cover rounded-2xl w-fit h-fit"
        />
      </div>
    </Link>
  );
};

export default ResumeCard;
