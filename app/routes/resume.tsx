import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Content from "~/components/Content";
import ResumeOverview from "~/components/ResumeOverview";

import ScoreGauge from "~/components/ScoreGauge";
import { usePuterStore } from "~/lib/puter";
import type { Resume } from "~/types";

const resume = () => {
  const { auth, kv, fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     if (!auth.isAuthenticated) {
  //       navigate(`/auth?next=resume/${id}`);
  //     }
  //   }, [auth.isAuthenticated]);
  const { id } = useParams();
  useEffect(() => {
    const loadResume = async () => {
      if (!resumeData) return;
      const blob = await fs.read(resumeData.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
      setLoading(false);
      console.log(url);
    };
    loadResume();
  }, [resumeData?.imagePath]);

  useEffect(() => {
    const getResume = async () => {
      const item = await kv.get(`resume:${id}`);
      setResumeData(item ? JSON.parse(item) : null);
      console.log(item ? JSON.parse(item) : null);
    };
    getResume();
  }, [id]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen !py-0 !px-0 !max-w-8xl">
      <nav className="h-20 bg-white/70 flex items-center gap-4 text-sm md:text-xl font-medium px-2 md:px-20">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center font-semibold hover:font-bold hover:shadow-2xl !text-black text-lg px-4 py-2 rounded-xl shadow-lg bg-white/70 hover:bg-white/90 transition cursor-pointer ml-4"
        >
          <img
            src="/public/icons/back.svg"
            alt="back"
            className="w-3 h-3 md:w-5 md:h-5"
          />
          <p className="hidden md:flex"> Back to Homepage</p>
        </button>
        <p className="text-dark-200">{resumeData?.jobTitle}</p>
        <p>{">"}</p>
        <p className="text-stone-950">Resume Review</p>
        <img
          src="/public/images/profile.svg"
          alt="resume"
          className="w-16 h-16  ml-auto rounded-full mr-4"
        />
      </nav>
      {resumeData && (
        <section className="main-section !max-w-8xl items-start  !mx-auto !my-8 !p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full h-full min-h-screen p-8 bg-white/70 rounded-3xl shadow-2xl flex items-center justify-center">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <img
                src={resumeUrl}
                alt="resume"
                className="rounded-2xl w-full h-full"
              />
            )}
          </div>
          <div className="w-full h-full min-h-screen p-8 bg-white/70 rounded-3xl shadow-2xl flex flex-col items-start justify-start gap-4">
            <h2 className="text-4xl font-bold !text-black">Resume Review</h2>
            <ResumeOverview feedback={resumeData.feedback} />
            <ATS ats={resumeData.feedback.ATS} />
            <Content feedback={resumeData.feedback} />
          </div>
        </section>
      )}
    </main>
  );
};

export default resume;
