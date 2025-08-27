import React, { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import NavBar from "~/components/NavBar";

const Upload = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelection: (file: File | null) => void = (file) => {
    setSelectedFile(file);
  };
  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");
    console.log({ companyName, jobTitle, jobDescription, selectedFile });
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
            <div>
              <img
                src="images/resume-scan.gif"
                alt="scanning..."
                className="w-full"
              />
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
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title </label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description </label>
                <textarea
                  rows={5}
                  id="job-description"
                  name="job-description"
                  placeholder="Job description"
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
