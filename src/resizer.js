import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920,
      1080,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      1920,
      1080
    );
  });