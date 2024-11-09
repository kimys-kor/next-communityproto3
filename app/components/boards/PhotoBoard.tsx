import { fetchInitialPhotoData } from "@/app/utils";
import PhotoBoardClient from "./PhotoBoardClient";
import EventBoardClient from "./EventBoardClient";

interface PhotoBoardProps {
  postType: number;
}

const PhotoBoard: React.FC<PhotoBoardProps> = async ({ postType }) => {
  try {
    const initialData = await fetchInitialPhotoData(postType);

    if (postType === 9) {
      return <PhotoBoardClient initialData={initialData} />;
    } else if (postType === 14) {
      return <EventBoardClient initialData={initialData} />;
    } else {
      return <div>Invalid post type</div>;
    }
  } catch (error) {
    console.error("Error fetching initial photo data:", error);
    return <div>Error loading data</div>;
  }
};

export default PhotoBoard;