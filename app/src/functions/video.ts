// import cv from "opencv4nodejs";

// // Video kaydı için kullanılacak dosya adı ve FPS (kare hızı)
// const videoFileName = "output.mp4";
// const fps = 30;

// // Video çekimine başlayın
// const camera = new cv.VideoCapture(0); // 0, varsayılan kamera cihazını temsil eder

// const videoWriter = new cv.VideoWriter(
//   videoFileName,
//   cv.VideoWriter.fourcc("X", "2", "6", "4"),
//   fps,
//   new cv.Size(640, 480),
//   true
// );

// const delay = 1000 / fps;

// function captureFrame() {
//   const frame = camera.read();
//   if (!frame.empty) {
//     videoWriter.write(frame);
//   }
//   setTimeout(captureFrame, delay);
// }

// console.log(`Video kaydediliyor: ${videoFileName}`);
// captureFrame();
