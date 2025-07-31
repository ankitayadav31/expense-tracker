import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {

  const formData = new FormData();
  
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData
    );

    console.log("response of upload image", response.data)
    return response.data; 
  } catch (error) {
    console.log("Error uplaoding the image", error);
    throw error; 
  }
};

export default uploadImage;
