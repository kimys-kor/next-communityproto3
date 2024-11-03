"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

interface NewBannerFormProps {
  onClose: () => void;
  onSave: () => void;
}

const NewBannerForm = ({ onClose, onSave }: NewBannerFormProps) => {
  const [partnerName, setPartnerName] = useState("");
  const [partnerUrl, setPartnerUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      await handleUploadImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      await handleUploadImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUrl(null);
  };

  const handleUploadImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      const imageResponse = await fetch("/api/imagesbanner", {
        method: "POST",
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadedImageData = await imageResponse.json();
      const uploadedUrl = uploadedImageData?.data?.[0];

      setImageUrl(uploadedUrl);
      toast.success("이미지가 성공적으로 업로드되었습니다.");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBanner = async () => {
    if (!partnerName || !imageUrl) {
      toast.error("파트너 이름과 이미지를 입력해주세요.");
      return;
    }

    try {
      const bannerResponse = await fetch("/api/admin/savebanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerName, thumbNail: imageUrl, partnerUrl }),
      });

      if (!bannerResponse.ok) {
        throw new Error("Failed to save banner");
      }

      toast.success("배너가 성공적으로 추가되었습니다.");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("배너 추가에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">배너 추가</h2>
        <input
          type="text"
          placeholder="파트너 이름"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="파트너 URL"
          value={partnerUrl}
          onChange={(e) => setPartnerUrl(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-4 border-dashed rounded-lg p-6 w-full mb-4 transition-colors ${
            isDragging ? "border-sky-400 bg-sky-200" : "border-sky-300 bg-white"
          }`}
        >
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform -translate-x-1 -translate-y-1 hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-sky-500">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
              <p className="mt-2">
                이미지를 드래그하거나 클릭하여 업로드하세요
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                accept="image/*"
              />
              <label
                htmlFor="fileInput"
                className="mt-3 cursor-pointer text-sky-500 underline"
              >
                파일 선택
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleSaveBanner}
            disabled={!imageUrl || !partnerName || uploading}
            className={`px-4 py-2 rounded relative ${
              !imageUrl || !partnerName || uploading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue text-white hover:bg-deepblue"
            }`}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBannerForm;
