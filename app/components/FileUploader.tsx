import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatFileSize } from "~/lib/utils";

const FileUploader = ({
  file,
  handleFileSelection,
}: {
  file: File | null;
  handleFileSelection: (file: File | null) => void;
}) => {
  //const [file, setFile] = React.useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles.length < 1 ||
        acceptedFiles.at(0) === undefined ||
        (acceptedFiles.at(0) && acceptedFiles.at(0)!.size > 20 * 1024 * 1024)
      ) {
        alert("please upload a pdf file smaller the 20 mb");
        return;
      }
      handleFileSelection(acceptedFiles.at(0) || null);
    },
    [handleFileSelection]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className="gradient-border w-full">
      <div
        {...getRootProps()}
        className="flex flex-col items-center cursor-pointer"
      >
        {file ? (
          <div
            className="uploader-selected-file w-full"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <img src="/images/pdf.png" alt="pdf" className="size-10" />
            <div className="flex items-center space-x-3">
              <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              className="p-2 cursor-pointer"
              onClick={() => {
                handleFileSelection(null);
              }}
            >
              <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <input {...getInputProps()} />
            <img
              src="/icons/info.svg"
              alt="Upload Icon"
              className="mx-auto mb-4"
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div>
                <p className="text-gray-500">
                  <span className="font-bold !text-black">Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p className="text-lg font-light text-gray-500">
                  PDF, PNG or JPG (max. 10MB)
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
