import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ResultCard from './ResultCard.jsx'

export default function SearchResults(props){
  return (
    <Container>
      {props.results.map((issue, idx) =>(
        <Row key={'result_' + idx}>
          <ResultCard issue={issue} selectComic={props.selectComic} />
        </Row>
      ))}
    </Container>
  )
}