import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

import './index.scss'

import apiRoutes from '../../../../state/ducks/api/apiRoutes'

import PictureList from './PictureList'
import PictureForm from './PictureForm'
import PictureUploader from './Uploader'


export default function Pictures(props) {

  const [picture, setPicture] = useState();

  useEffect(() => {
    if (picture) return;

    if (Array.isArray(props.pictures) && props.pictures.length > 0) {
      setPicture(props.pictures[0])
    }
    else {
      setPicture(null);
    }
  }, [props.pictures, picture])

  function editPicture(pic) {
    setPicture(pic);
  }

  function createPicture(fileInfo) {
    setPicture({
      fileName: fileInfo.fileName,
      isDefaultPicture: Array.isArray(props.pictures) && props.pictures.length > 0 ? false : true
    })
  }

  function submitPictureForm(values) {
    if (typeof (props.onPictureFormSubmit) === 'function') return props.onPictureFormSubmit(values);
  }

  return (
    <>
      <Card className="tab-content">
        <Card.Body>
          <PictureList pictures={props.pictures} onEdit={editPicture} />
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Header className="d-flex justify-content-between">
          Edit Picture
          <Button size="sm" variant="info" onClick={() => setPicture({})}>New Picture</Button>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}>
              {
                picture && picture.fileName
                  ? <img width="100%" src={`${apiRoutes.pictures.deals}/${picture.fileName}`} alt="" />
                  : <PictureUploader onPictureUploaded={createPicture} />
              }
            </Col>
            <Col sm={8}>
              <PictureForm initValues={picture} onSubmit={submitPictureForm} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}