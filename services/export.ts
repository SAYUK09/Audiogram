import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
  mode: "no-cors",
};

export const exportVideo = async (data: any) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/render-video",
      data,
      config
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getDownloadUrlAndProgress = async (body: any) => {
//   const res = await axios.post(
//     "https://audiogram.sayuk.repl.co/progress",
//     body
//   );
//   return res;
// };
