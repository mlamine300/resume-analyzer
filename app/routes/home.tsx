import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
//import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import type { Resume } from "~/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "increase your chances of being hired!" },
    { name: "icon", href: "/favicon.ico" },
  ];
}

export default function Home() {
  const { auth, fs, kv } = usePuterStore();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      navigate("/auth");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const fetchResumes = async () => {
      const allKeys = (await kv.list("resume:*", true)) as KVItem[];

      const data = allKeys?.map((item) => JSON.parse(item.value));
      setResumes(data);
      console.log(allKeys);
    };
    fetchResumes();
  }, []);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <NavBar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Track your Applications & resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
        <div className="flex flex-wrap justify-center">
          {resumes.length > 0 &&
            resumes.map((resume, index) => (
              <ResumeCard key={index} resume={resume} />
            ))}
        </div>
      </section>
    </main>
  );
}
