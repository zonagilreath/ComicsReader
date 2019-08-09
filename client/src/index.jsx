import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page.jsx';
import PageViewList from './components/ViewList.jsx';
import PostForm from './components/PostForm.jsx';
import SearchForm from './components/SearchForm.jsx';
import SearchResults from './components/SearchResults.jsx';
// const json = '[{"pageoid":16549},{"pageoid":16550},{"pageoid":16551},{"pageoid":16552},{"pageoid":16553},{"pageoid":16554},{"pageoid":16555},{"pageoid":16556},{"pageoid":16557},{"pageoid":16558},{"pageoid":16559},{"pageoid":16560},{"pageoid":16561},{"pageoid":16562},{"pageoid":16563},{"pageoid":16564},{"pageoid":16565},{"pageoid":16566},{"pageoid":16567},{"pageoid":16568},{"pageoid":16569},{"pageoid":16570},{"pageoid":16571},{"pageoid":16572}]'

// const oids = JSON.parse(json).map(oidObj => oidObj.pageoid)

const divStyle = {
  width: '100%',
  textAlign: 'center',
  paddingTop: '80px'
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      activeComic: null,
      oids: [],
      searchResults: [],
    }
    this.receiveSearchResults = this.receiveSearchResults.bind(this);
    this.selectComic = this.selectComic.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  receiveSearchResults(data){
    this.setState({
      searchResults: data
    }, ()=> console.log(this.state))
  }

  submitPost(){}

  selectComic(issue_id){
    console.log(issue_id);
    fetch('/issues/' + issue_id)
    .then(data => data.json())
    .then(data => {
      const oids = data.map(oidObj => oidObj.pageoid)
      this.setState({activeComic: issue_id, oids, searchResults: []})
    })
  }

  render(){
    return(
      <React.Fragment>
      {this.state.searchResults.length ? (
        <SearchResults
          results={this.state.searchResults}
          selectComic={this.selectComic}
        />
      ) : (null)}
      {this.state.activeComic ? (
        <PageViewList oids={this.state.oids} />
      ) : (null)}
      <PostForm />
      <SearchForm receiveSearchResults={this.receiveSearchResults} />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));