import React from "react";

const ImageUpload = ({label, accept, type, method }) => {
  return (
    <div className="file has-name is-boxed">
      <label className="file-label">
        <input
          className="file-input"
          type={type}
          accept={accept}
          onChange={(e) => {
            method(e);
          }}
          multiple
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload" />
          </span>
          <span className="file-label">{label}</span>
        </span>
      </label>
    </div>
  );
};

export default ImageUpload;
