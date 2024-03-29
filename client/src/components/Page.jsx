import React, {Component} from 'react';
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";


export default function Page(props){
  return (
    <GlassMagnifier
      style={{overflow: 'visible'}}
      magnifierBorderSize={1}
      className='overflow'
      allowOverFlow={true}
      magnifierSize='120%'
      magnifierBackgroundColor='rgba(10,10,10,.5)'
      square={true}
      imageSrc={'/content/' + props.oid + '.jpg'}
      imageAlt="Example"
    />
  )
}