import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

    // <Form onSubmit={props.submitPost}>
export default function PostForm(props){
  return (
    <form action='/' method='post'>
      <Row>
        <Col>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="Series title" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formGroupYear">
            <Form.Label>Year</Form.Label>
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
        <Col>
          <Form.Group controlId="formGroupIssueNumber">
            <Form.Label>Issue number</Form.Label>
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
        <Col>
          <Form.Group controlId="pages">
            <Form.Label>Upload your comic</Form.Label>
            <Form.Control name="files" type="file" multiple/>
          </Form.Group>
        </Col>
        <Col></Col>
        <Col>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  )
}