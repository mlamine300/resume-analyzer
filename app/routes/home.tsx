import NavBar from "~/components/NavBar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "increase your chances of being hired!" },
    { name: "icon", href: "/favicon.ico" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth");
    }
  }, [auth.isAuthenticated]);
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
