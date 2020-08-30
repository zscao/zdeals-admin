import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import * as pictureActions from '../../../../state/ducks/pictures/request';

export default function Uploader(props) {
  const [ loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ state: '', percentage: 0 });

  function onDropFiles(acceptedFiles) {
    if(!Array.isArray(acceptedFiles) || !acceptedFiles.length) return;
    
    const file = acceptedFiles[0];
    uploadFile(file)
  }

  function uploadFile(file) {
    setLoading(true);
    setProgress({ state: 'uploading', percentage: 0 });

    pictureActions.uploadPicture('deals', file, onUploadProgress)
      .then(response => {
        setLoading(false);
        setProgress({ state: 'done', percentage: 100 });

        if (response.fileName) {
          if(typeof(props.onPictureUploaded) === 'function') props.onPictureUploaded(response);
        }
      })
      .catch(() => {
        setLoading(false);
        setProgress({ state: 'done', percentage: 100 });
      });
  }

  function onUploadProgress(event) {
    
    if (event.lengthComputable) {
      if (event.total <= 0) return;

      if (event.loaded === event.total) {
        setProgress({ state: 'processing', percentage: 100 });
      }
      else {
        const percentage = (event.loaded / event.total) * 100;
        setProgress({ state: 'uploading', percentage });
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropFiles })

  return (
    <div {...getRootProps({ className: 'picture-dropzone clickable' })}>
      <input {...getInputProps()} />
      <p className="clickable">{loading ? `${progress.state}: ${progress.percentage}%` : "Click here to select a file to upload."}</p>
    </div>
  )

}