import React, {Component} from 'react';
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

const divStyle = {
  width: '40%',
  display: 'inline-block'
}

export default function Page(props){
  return (
    <div style={divStyle}>
      <GlassMagnifier
        magnifierBorderSize={1}
        magnifierSize='100%'
        magnifierBackgroundColor='rgba(10,10,10,.5)'
        square={true}
        imageSrc={'/content/' + props.poid + '.jpg'}
        imageAlt="Example"
      />
 
      <Magnifier
        imageSrc={'/content/' + props.poid + '.jpg'}
        imageAlt="Example"
        mouseActivation={MOUSE_ACTIVATION.CLICK} // Optional
        touchActivation={TOUCH_ACTIVATION.LONG_TOUCH} // Optional
      />
    </div>
  )
}