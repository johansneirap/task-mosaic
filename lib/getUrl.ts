import { storage } from "@/appwrite";

const getUrl = async (image: TodoImage) => {
  const url = storage.getFilePreview(image.bucketId, image.fileId);
  return url;
};

export default getUrl;
