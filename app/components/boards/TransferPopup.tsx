import { useState } from "react";

interface TransferPopupProps {
  onClose: () => void;
  onConfirm: (postType: number) => void;
}

const TransferPopup: React.FC<TransferPopupProps> = ({
  onClose,
  onConfirm,
}) => {
  const [selectedPostType, setSelectedPostType] = useState<number | null>(null);

  const categories = [
    { id: 1, name: "파트너" },
    { id: 2, name: "해외축구분석" },
    { id: 3, name: "아시아축구분석" },
    { id: 4, name: "MLB분석" },
    { id: 5, name: "KBO/NPB분석" },
    { id: 6, name: "NBA분석" },
    { id: 7, name: "국내외농구분석" },
    { id: 8, name: "배구분석" },
    { id: 9, name: "안구정화" },
    { id: 10, name: "유머이슈" },
    { id: 11, name: "나는분석왕" },
    { id: 12, name: "자유게시판" },
    { id: 13, name: "피해사례" },
    { id: 14, name: "이벤트" },
    { id: 15, name: "포인트교환신청" },
    { id: 16, name: "일반홍보" },
    { id: 17, name: "꽁머니홍보" },
    { id: 18, name: "구인구직" },
    { id: 19, name: "공지사항" },
    { id: 20, name: "1:1문의" },
  ];

  const handleConfirm = () => {
    if (selectedPostType !== null) {
      onConfirm(selectedPostType);
      onClose();
    } else {
      alert("이동할 게시판을 선택하세요");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full transform transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          이동할 게시판을 선택하세요
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedPostType === category.id
                  ? "border-teal-600 bg-teal-500"
                  : "border-gray-200 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedPostType(category.id)}
            >
              <input
                type="radio"
                id={`category-${category.id}`}
                name="category"
                value={category.id}
                checked={selectedPostType === category.id}
                onChange={() => setSelectedPostType(category.id)}
                className="hidden"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-gray-700 cursor-pointer w-full text-center"
              >
                {category.name}
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferPopup;
