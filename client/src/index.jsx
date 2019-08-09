import React from 'react';
import ReactDOM from 'react-dom';
import PageViewList from './components/ViewList.jsx';
import PostForm from './components/PostForm.jsx';
import SearchForm from './components/SearchForm.jsx';
import SearchResults from './components/SearchResults.jsx';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      activeComic: null,
      oids: [],
      searchResults: [],
      userMakingPost: false
    }
    this.receiveSearchResults = this.receiveSearchResults.bind(this);
    this.selectComic = this.selectComic.bind(this);
    this.addComicButton = this.addComicButton.bind(this);
  }

  receiveSearchResults(data){
    this.setState({
      searchResults: data
    }, ()=> console.log(this.state))
  }

  selectComic(issue_id){
    console.log(issue_id);
    fetch('/issues/' + issue_id)
    .then(data => data.json())
    .then(data => {
      const oids = data.map(oidObj => oidObj.pageoid)
      this.setState({activeComic: issue_id, oids, searchResults: []})
    })
  }

  addComicButton(){
    console.log('button clicked');
    this.setState({userMakingPost: true})
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
      {this.state.userMakingPost ? (
        <PostForm
          submitPost={this.submitPost}
        />
      ) : (
        <SearchForm
          addComicButton={this.addComicButton}
          receiveSearchResults={this.receiveSearchResults}
          />
      )}
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));