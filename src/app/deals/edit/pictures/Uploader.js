import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import * as pictureActions from '../../../../state/ducks/pictures/request';

export default function Uploader(props) {
  const [ loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ state: '', percentage: 0 });

  function onDropFiles(acceptedFiles) {
    if(!Array.isArray(acceptedFiles) || !acceptedFiles.length) return;
    
    const file = acceptedFiles[0];
    //console.log('file: ', file);
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

  async function uploadImageFromClipboard() {
    if(!navigator.clipboard) return;

    const auth = await navigator.permissions.query( { name: "clipboard-read" } );
    //console.log('auth: ', auth);

    if( auth.state !== 'denied' ) {
      const item_list = await navigator.clipboard.read();

      let image_type; 
      const image = item_list.find( item => 
        item.types.some(type => {
          if(type.startsWith('image/')) {
            image_type = type;
            return true;
          }
        })
      );
      const file = image && await image.getType(image_type);
      //console.log( file );
      if(file &&  file.size > 1000) {
        uploadFile(file);
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropFiles })
  const canPasteFromClipboard = !!navigator.clipboard

  return (
    <>
      <div {...getRootProps({ className: 'picture-dropzone clickable' })}>
        <input {...getInputProps()} />
        <p className="clickable">{loading ? `${progress.state}: ${progress.percentage}%` : "Click here to select a file to upload."}</p>
      </div>
      {canPasteFromClipboard && <div className="picture-dropzone clickable" onClick={uploadImageFromClipboard}>Paste from Clipboard</div>}
    </>
  )

}