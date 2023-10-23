import * as NodeWebcam from "node-webcam";

export default async function cam() {
  const opts = {
    width: 1280,
    height: 720,
    quality: 100,
    device: "/dev/video0",
  };

  const Webcam = NodeWebcam.create(opts);

  Webcam.capture("/home/gokhangunduz/Desktop/test.jpg", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Kamera başarıyla açıldı.");
    }
  });
}
