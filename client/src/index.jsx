import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page.jsx';
import ViewList from './components/ViewList.jsx';
import Form from './components/PostForm.jsx'
const json = '[{"pageoid":16549},{"pageoid":16550},{"pageoid":16551},{"pageoid":16552},{"pageoid":16553},{"pageoid":16554},{"pageoid":16555},{"pageoid":16556},{"pageoid":16557},{"pageoid":16558},{"pageoid":16559},{"pageoid":16560},{"pageoid":16561},{"pageoid":16562},{"pageoid":16563},{"pageoid":16564},{"pageoid":16565},{"pageoid":16566},{"pageoid":16567},{"pageoid":16568},{"pageoid":16569},{"pageoid":16570},{"pageoid":16571},{"pageoid":16572}]'

const oids = JSON.parse(json).map(oidObj => oidObj.pageoid)

const divStyle = {
  width: '100%',
  textAlign: 'center',
  paddingTop: '80px'
}

function App(props){
  return (
    <PostForm />
  )
}

ReactDOM.render(<App />, document.getElementById('app'));