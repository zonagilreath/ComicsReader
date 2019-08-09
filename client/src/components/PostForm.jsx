import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function PostForm(props){
  return (
    <Container style={{maxWidth: '650px'}}>
      <Image src="https://cdn.pastemagazine.com/www/articles/2016/06/22/FlexMentallo_Main.jpg" fluid />
      <Jumbotron variant='dark'>
        <h1>Add a comic to your collection!</h1>
        <form action='/upload' encType="multipart/form-data" method='POST'>
          <Row>
            <Col xs="8" lg="4">
              <Form.Group controlId="formGroupTitle">
                <Form.Control name="title" type="text" placeholder="Series title" />
              </Form.Group>
            </Col>
            <Col xs="8" lg="4">
              <Form.Group controlId="formGroupYear">
                <Form.Control
                name="year"
                type="number"
                placeholder="Year"
                min={1932}
                max={2019}
                step={1}
              />
              </Form.Group>
            </Col>
            <Col xs="8" lg="4">
              <Form.Group controlId="formGroupIssueNumber">
                <Form.Control
                name="issue_number"
                type="number"
                placeholder="Issue number"
                min={0}
                max={2000}
                step={1}
              />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs="8" lg="4">
              <Form.Group controlId="pages">
                <Form.Control name="files" type="file" multiple/>
              </Form.Group>
            </Col>
            <Col xs="8" lg="4">
              <Button
                  variant="secondary"
                  type="button"
                  onClick={props.backToSearch}>
                  Back to search
                </Button>
            </Col>
            <Col xs="8" lg="4">
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </Jumbotron>
    </Container>
  )
}