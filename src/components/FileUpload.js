import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileName = `upload_${Date.now()}.${file.name.split(".").pop()}`;

    const { data, error } = await supabase.storage
      .from("form-images")
      .upload(fileName, file);

    if (error) alert("Upload failed!");
    else console.log("File uploaded:", data);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      <p>Drag & drop a scanned form, or click to browse</p>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};