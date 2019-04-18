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
  return <div>
    <h2>Please choose your best 10 photos</h2>
    {images.map((image,index)=>(
        <div onClick={()=>{remove(image.imgkey)}} key={index}>
            <img src={image.imgSrc}/>
        </div>
    ))}
      {images.length <10? <ImageUpload 
      label={uploLabel} 
      accept={uploAccept} 
      type={upLoType} 
      method={uploadMethod}/>: null}
  </div>;
};

PortFolioSec.propTypes = {};

export default PortFolioSec;

// fileName, label, accept, type, method }) => {
