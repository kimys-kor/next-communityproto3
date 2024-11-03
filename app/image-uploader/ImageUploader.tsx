"use client";
import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

interface ImageUploaderProps {
  onUpload?: (imageUrls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const addFiles = useCallback((files: File[]) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevPreviews) => [...prevPreviews, ...previews]);
  }, []);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const uploadedUrls = await response.json();

      window.opener.postMessage({ imageUrls: uploadedUrls }, "*");

      window.close();
    } catch (error) {
      console.error("Error uploading images", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-100">
      <h2 className="text-3xl font-semibold text-sky-600">사진 첨부하기</h2>
      <div className="py-2 w-full flex justify-end">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-white bg-sky-500 hover:bg-sky-600 px-6 py-2 font-semibold rounded"
        >
          파일 선택
        </label>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-4 border-dashed rounded-lg p-6 w-full flex flex-col items-center justify-center mb-4 transition-colors ${
          isDragging ? "border-sky-400 bg-sky-200" : "border-sky-300 bg-white"
        }`}
      >
        {!selectedFiles.length ? (
          <div className="flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              size="3x"
              className="text-sky-400 mb-4"
            />
            <p className="text-sky-500">사진을 드래그 하세요</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 mb-6">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`미리보기 ${index}`}
                  className="w-32 h-32 object-cover border border-gray-300 rounded shadow-md"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform -translate-x-1 -translate-y-1 hover:bg-red-600"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className={`px-6 py-2 font-semibold text-white rounded ${
          uploading || selectedFiles.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-sky-500 hover:bg-sky-600"
        }`}
      >
        {uploading ? "업로드 중..." : "업로드"}
      </button>
    </div>
  );
};

export default ImageUploader;
