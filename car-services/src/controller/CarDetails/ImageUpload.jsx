import React, { useState } from "react";
import "./imageUpload.css";

const ImageUpload = () => {
  const [numImages, setNumImages] = useState(1);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleNumImagesChange = (e) => {
    const selectedNum = parseInt(e.target.value, 10);
    setNumImages(selectedNum);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, numImages);
    setImageFiles(files);

    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="fileupload">
      <label>Select the number of images to upload:</label>
      <select onChange={handleNumImagesChange} value={numImages}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>

      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        accept="image/*"
      />

      {imagePreviews.length > 0 && (
        <div>
          <p>Selected Images:</p>
          <div className="image-preview-container">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Image ${index + 1}`}
                className="image-preview"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
