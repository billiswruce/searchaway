import axios from "axios";

const searchImages = async (query: any) => {
  const url = "https://www.googleapis.com/customsearch/v1";
  try {
    const response = await axios.get(url, {
      params: {
        key: import.meta.env.VITE_GOOGLE_API_KEY,
        cx: import.meta.env.VITE_GOOGLE_ID,
        num: 10,
        searchType: "image",
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during the API call", error);
    return null;
  }
};

export default searchImages;
