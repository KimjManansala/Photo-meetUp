import React from "react";
import ImageUpload from "./ImageUpload";

const PortFolioSec = ({
  uploadMethod,
  uploLabel,
  uploAccept,
  upLoType,
  images,
  remove
}) => {
  return (
    <React.Fragment>
      
      {images.map((image, index) => (
        <div className='port-images'
          onClick={() => {
            remove(image.imgkey);
          }}
          key={index}
        >
          <img src={image.imgSrc} />
        </div>
      ))}
      {images.length < 10 ? (
        <ImageUpload
          label={uploLabel}
          accept={uploAccept}
          type={upLoType}
          method={uploadMethod}
        />
      ) : null}
    </React.Fragment>
  );
};

PortFolioSec.propTypes = {};

export default PortFolioSec;

// fileName, label, accept, type, method }) => {
