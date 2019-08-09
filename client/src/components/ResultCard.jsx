import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ResultCard(props){
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.issue.title} #{props.issue.issue_number}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.issue.year}</Card.Subtitle>
        <Button variant="light" onClick={()=>{
          props.selectComic(props.issue.id)
        }}>Read</Button>
      </Card.Body>
    </Card>
  )
}