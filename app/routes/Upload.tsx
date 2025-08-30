import React, { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import NavBar from "~/components/NavBar";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2img";

import { prepareInstructions } from "~/constants";

const Upload = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { ai, fs, kv, auth } = usePuterStore();

  // useEffect(() => {
  //   if (!auth.isAuthenticated) {
  //     //alert("not auth");
  //     navigate("/auth?next=upload");
  //   }
  // }, [auth.isAuthenticated]);

  const handleFileSelection: (file: File | null) => void = (file) => {
    setSelectedFile(file);
  };

  const analyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    resumeFile,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    resumeFile: File;
  }): Promise<string> => {
    // Placeholder for actual analysis logic

    setIsProcessing(true);
    setStatus("Uploading resume...");
    const file = await fs.upload([resumeFile]);
    if (!file) {
      console.log("could not upload resume!");
      setIsProcessing(false);
      return "";
    }
    setStatus("Converting PDF to image...");
    const image = await convertPdfToImage(selectedFile!);
    if (!image) {
      console.log("could not convert pdf to image !");
      setIsProcessing(false);
      return "";
    }

    if (!image.file) {
      console.log("image.file is null!");
      setIsProcessing(false);
      return "";
    }
    setStatus("Uploading image...");
    const imageFile = await fs.upload([image.file]);

    if (!imageFile) {
      console.log("could not upload image!");
      setIsProcessing(false);
      return "";
    }
    const uuid = crypto.randomUUID();
    const data = {
      companyName,
      jobTitle,
      jobDescription,
      resumePath: file?.path,
      imagePath: imageFile?.path,
      createdAt: new Date().toISOString(),
      id: uuid,
      feedback: {},
    };
    const message = prepareInstructions({ jobTitle, jobDescription });
    setStatus("Analyzing resume...");
    const feedback = await ai.feedback(file?.path || "", message);
    if (!feedback) {
      console.log("could not get feedback!");
      setIsProcessing(false);
      return "";
    }
    data.feedback = JSON.parse(feedback.message.content as string);
    kv.set(`resume:${uuid}`, JSON.stringify(data));
    console.log(feedback);

    setStatus("Analysis complete!");
    setIsProcessing(false);
    navigate(`/resume/${uuid}`);
    return feedback.message.content as string;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!selectedFile) return;
    const feedback = await analyze({
      companyName,
      jobTitle,
      jobDescription,
      resumeFile: selectedFile,
    });
    //console.log({ companyName, jobTitle, jobDescription, selectedFile });
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen  px-4">
      <NavBar />
      <section className="main-section max-md:!gap-2">
        <div className="page-heading pt-16 ">
          <h1 className="!text-4xl md:!text-8xl text-center">
            Smart feedback for your dream job
          </h1>
          <h2 className="text-center !text-lg md:!text-3xl">
            Drop your resume for an ATS score and improvement tips.
          </h2>
        </div>
        <div className="w-full !max-w-2xl mb-2 flex items-start">
          {isProcessing ? (
            <div className="w-full flex flex-col items-center justify-center">
              <img
                src="images/resume-scan.gif"
                alt="scanning..."
                className="w-full"
              />
              <h1 className="!text-4xl text-gradient">{status} </h1>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-div">
                <label htmlFor="company-name">Company Name </label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Company name"
                  required
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title </label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                  required
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description </label>
                <textarea
                  rows={5}
                  id="job-description"
                  name="job-description"
                  placeholder="Job description"
                  required
                />

                <div className="form-div">
                  <label htmlFor="upload-file">Upload File </label>
                  <FileUploader
                    file={selectedFile}
                    handleFileSelection={handleFileSelection}
                  />
                </div>
              </div>
              <button type="submit" className="primary-button">
                Save & Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
