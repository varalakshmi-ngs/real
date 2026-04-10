// ImageEditContainer.jsx
import React, { useRef } from "react";
import FormBtn from "./FormBtn";
import { Repeat } from "lucide-react";

export default function ImageEditContainer({
  title = "Hero Image",
  existingImage = null,
  onImageChange = () => {},
}) {
  const [preview, setPreview] = React.useState(existingImage);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="border border-primary flex flex-col gap-4 items-center justify-between rounded-lg p-4 w-full">
      <p className="text-xs font-primary">{title}</p>

      {/* Show preview */}
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-auto max-h-80 object-contain rounded"
        />
      ) : (
        <p>No image selected</p>
      )}

      {/* Hidden input for file selection */}
      <div className="flex items-center gap-2">
        {/* Hidden input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Custom button with icon */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Repeat size={18} />
          Change Image
        </button>
      </div>
      {/* Optional: reset button */}
      {/* <FormBtn title="Reset" onClick={() => setPreview(null)} /> */}
    </div>
  );
}
