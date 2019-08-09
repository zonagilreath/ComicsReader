import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page.jsx'

const divStyle = {
  width: '100%',
  textAlign: 'center',
  paddingTop: '300px'
}

function App(props){
  return (
    <div style={divStyle}>
      <Page poid={16601} />
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));