import React, {Component} from 'react';
import LazyLoad from 'react-lazyload';
import Page from './Page.jsx'

export default function ViewList(props){
  return (
    <div>
      {props.oids.map((oid, idx) =>(
        <LazyLoad key={'page_' + idx} offset={100} once>
          <Page oid={oid} />
        </LazyLoad>
      ))}
    </div>
  )
}