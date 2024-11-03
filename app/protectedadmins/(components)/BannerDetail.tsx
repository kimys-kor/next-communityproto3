import React, { useState } from "react";
import { Banner } from "@/app/types";

type BannerDetailProps = {
  banner: Banner;
  onBack: () => void;
};

function BannerDetail({ banner, onBack }: BannerDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [partnerName, setPartnerName] = useState(banner.partnerName);
  const [partnerUrl, setPartnerUrl] = useState(banner.partnerUrl);
  const [thumbNail, setThumbNail] = useState(banner.thumbNail);
  const [imagePreview, setImagePreview] = useState<string | null>(
    banner.thumbNail
  );

  const handlePartnerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartnerName(e.target.value);
  };

  const handlePartnerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartnerUrl(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Temporarily preview the new image

      const uploadFormData = new FormData();
      uploadFormData.append("files", file, file.name);

      try {
        const response = await fetch("/api/imagesbanner", {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          console.error("Failed to upload image");
          return;
        }

        const data = await response.json();
        const uploadedUrl = data.data[0];
        console.log(uploadedUrl + "hihihihi");
        if (uploadedUrl) {
          setThumbNail(uploadedUrl); // Set the new thumbnail URL from response
          setImagePreview(uploadedUrl); // Update the preview to the new URL
          console.log("Updated thumbNail URL:", uploadedUrl);
        } else {
          console.error("Image upload response is missing the URL");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setPartnerName(banner.partnerName);
    setPartnerUrl(banner.partnerUrl);
    setThumbNail(banner.thumbNail);
    setImagePreview(banner.thumbNail);
  };

  const handleSubmit = async () => {
    if (!banner.id || !partnerName || !partnerUrl || !thumbNail) {
      console.log("Missing required fields.");
      return;
    }

    const formData = {
      id: banner.id,
      partnerName,
      partnerUrl,
      thumbNail,
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch("/api/admin/updatebanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("배너 정보가 성공적으로 업데이트되었습니다.");
        onBack();
      } else {
        console.error("Failed to update banner information");
      }
    } catch (error) {
      console.error("Error updating banner information:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md border border-gray-300 shadow-sm max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        배너 상세 정보
      </h2>
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center justify-between">
          <p>
            <strong>ID:</strong> {banner.id}
          </p>
          <button
            onClick={handleEditClick}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md"
          >
            정보 수정
          </button>
        </div>

        {isEditing ? (
          <>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                파트너 이름
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={handlePartnerNameChange}
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                파트너 URL
              </label>
              <input
                type="text"
                value={partnerUrl}
                onChange={handlePartnerUrlChange}
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-indigo-700">
                배너 이미지
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-green-300 rounded bg-green-50"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Banner Preview"
                  className="mt-2 w-full h-auto rounded"
                />
              )}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleCancelClick}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
              >
                저장
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong className="text-indigo-700">파트너 이름:</strong>{" "}
              {banner.partnerName}
            </p>
            <p>
              <strong className="text-indigo-700">파트너 URL:</strong>{" "}
              <a
                href={banner.partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {banner.partnerUrl}
              </a>
            </p>
            <p>
              <strong className="text-indigo-700">클릭 수:</strong>{" "}
              {banner.clickNum}
            </p>
            <p>
              <strong className="text-indigo-700">배너 이미지:</strong>
            </p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Banner Preview"
                className="mt-2 w-full h-auto rounded"
              />
            )}
          </>
        )}
      </div>
      <button
        onClick={onBack}
        className="mt-6 w-full px-4 py-2 bg-gray-600 text-white rounded-md"
      >
        목록으로 돌아가기
      </button>
    </div>
  );
}

export default BannerDetail;
