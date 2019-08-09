import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PostForm(props){
  const containerPadding = {
    paddingTop: "25vh"
  }
  return (
    <Container style={containerPadding}>
      <form action='/upload' encType="multipart/form-data" method='POST'>
        <Row>
          <Col xs="8" lg="2">
            <Form.Group controlId="formGroupTitle">
              <Form.Control name="title" type="text" placeholder="Series title" />
            </Form.Group>
          </Col>
          <Col xs="8" lg="2">
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
          <Col xs="8" lg="2">
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
          <Col xs="8" lg="2">
            <Form.Group controlId="pages">
              <Form.Control name="files" type="file" multiple/>
            </Form.Group>
          </Col>
          <Col xs="8" lg="2">
            <Button
                variant="secondary"
                type="button"
                onClick={props.backToSearch}>
                Back to search
              </Button>
          </Col>
          <Col xs="8" lg="2">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  )
}