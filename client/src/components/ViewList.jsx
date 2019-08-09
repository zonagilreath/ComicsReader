import React, {Component} from 'react';
import LazyLoad from 'react-lazyload';
import Container from 'react-bootstrap/Container'
import Page from './Page.jsx'

export default function PageViewList(props){
  return (
    <Container>
      {props.oids.map((oid, idx) =>(
        <LazyLoad key={'page_' + idx} offset={100} once>
          <Page oid={oid} />
        </LazyLoad>
      ))}
    </Container>
  )
}