import Webcam from "react-webcam";
import { supabase } from "../lib/supabaseClient";

const MobileScanner = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const uploadToSupabase = async () => {
    const blob = await fetch(imgSrc).then(res => res.blob());
    const fileExt = blob.type.split("/")[1];
    const fileName = `scan_${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("form-images")
      .upload(fileName, blob);

    if (error) console.error("Upload failed:", error);
    else console.log("Uploaded:", data);
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }} // Rear camera
      />
      <button onClick={capture}>Capture</button>
      {imgSrc && (
        <>
          <img src={imgSrc} alt="Captured form" />
          <button onClick={uploadToSupabase}>Upload</button>
        </>
      )}
    </div>
  );
};