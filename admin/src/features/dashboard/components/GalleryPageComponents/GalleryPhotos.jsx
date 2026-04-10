import React, { useState, useRef, useEffect } from "react";
import OpenCloseLayout from "../../../../utils/OpenCloseLayout";
import { Trash2, Upload } from "lucide-react";
import { apiRequest } from "../../../../services/ApiCalls";
import { APIURL } from "../../../../Core/url";
import { toast } from "react-toastify";

export default function GalleryPhotos() {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchAllImages = async () => {
    try {
      const resp = await apiRequest({
        url: "/gallery/galleryimages/all",
        method: "get",
      });
      if (resp && resp.data) {
        setImages(resp.data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery images", error);
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const onFilesChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;
    
    e.target.value = null;
    setIsUploading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("image", file));

    try {
      const res = await apiRequest({
        method: "post",
        url: "/gallery/galleryimages/all", // Fixed to use 'all' for global upload
        data: formData,
      });

      if (res) {
        toast.success("Images uploaded successfully!");
        fetchAllImages();
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await apiRequest({
        method: "delete",
        url: `/gallery/galleryimages/${id}`,
      });

      if (resp.success) {
        toast.success("Image deleted");
        setImages(images?.filter((e) => e.id !== id));
      }
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
  };

  return (
    <OpenCloseLayout title="Unified Gallery Management">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Gallery Photos</h3>
            <p className="text-sm text-slate-500">Manage all your church photos in one place.</p>
          </div>
          <button
            type="button"
            disabled={isUploading}
            onClick={handleButtonClick}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Images"}
            <Upload size={20} />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm min-h-[400px]">
          {(!images || images.length === 0) ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-slate-400">
              <Upload size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-lg">No images uploaded yet</p>
              <p className="text-sm">Click the upload button above to add photos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {images?.map((e) => (
                <div
                  key={e.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <img
                    src={`${APIURL}/${e.image}`}
                    alt="gallery"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(e.id)}
                      className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"
                      title="Delete Image"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFilesChange}
          ref={inputRef}
          className="hidden"
        />
      </div>
    </OpenCloseLayout>
  );
}

