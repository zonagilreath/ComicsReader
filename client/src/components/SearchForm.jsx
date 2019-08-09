import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class PostForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      year: null,
      issue_number: null
    }
    this.captureFormChange = this.captureFormChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  captureFormChange(e){
    const field = e.target.name;
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState, ()=>console.log(this.state))
  }

  submitSearch(e){
    e.preventDefault();
    let queryString = '/?';
    if (this.state.title) queryString += 'title=' + this.state.title;
    if (this.state.year) queryString += 'year=' + this.state.year;
    if (this.state.issue_number) queryString += 'issue_number=' + this.state.issue_number;
    fetch(queryString)
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(data => this.props.receiveSearchResults(data))
  }

  render() {
    const containerPadding = {
      paddingTop: "25vh"
    }
    return (
      <Container style={containerPadding}>
        <Form onSubmit={this.submitSearch}>
          <Row>
            <Col xs="8" lg="2">
              <Form.Group controlId="formGroupTitle">
                <Form.Control name="title" onChange={this.captureFormChange} type="text" placeholder="Series title" />
              </Form.Group>
            </Col>
            <Col xs="8" lg="2">
              <Form.Group controlId="formGroupYear">
                <Form.Control
                onChange={this.captureFormChange}
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
                onChange={this.captureFormChange}
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
              <Button
                variant="secondary"
                type="button"
                onClick={this.props.addComicButton}>
                Add a comic
              </Button>
            </Col>
            <Col xs="8" lg="2"></Col>
            <Col xs="8" lg="2">
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}