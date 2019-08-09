import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ResultCard(props){
  return (
    <Card bg="dark" text="white"  style={{ 
      width: '18rem' ,
      marginTop: '40px'
    }}>
      <Card.Img variant="top" src={`content/${props.issue.coverimage}.jpg`}/>
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