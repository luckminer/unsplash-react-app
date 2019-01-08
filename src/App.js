import React, { Component } from 'react';

import SearchForm from './components/SearchForm'
import List from './components/List'
import Pagination from './components/Pagination'

import './App.css';

const UNSPLASH_BASE_URL = process.env.REACT_APP_UNSPLASH_BASE_URL;
const UNSPLASH_CLIENT_ID = process.env.REACT_APP_UNSPLASH_CLIENT_ID;

const loadingStatus = {
  success: 'Success',
  error: 'Error',
  loading: 'Loading'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      totalPhotos: 0,
      perPage: 9,
      currentPage: 1,
      loadingState: loadingStatus.loading
    };
  }

  componentDidMount() {
    this.fetchPhotos(this.state.currentPage)
  }

  fetchPhotos = async page => {
    const {perPage} = this.state;
    const url = `${UNSPLASH_BASE_URL}/photos/?page=${page}&per_page=${perPage}&client_id=${UNSPLASH_CLIENT_ID}`;
    this.setState({loadingState: loadingStatus.loading});
    try {
      const response = await fetch(url);
      const photos = await response.json();

      const totalPhotos = parseInt(response.headers.get("x-total"));
      this.setState({
        photos: photos,
        totalPhotos,
        currentPage: page,
        loadingState: loadingStatus.success
      })
    } catch (e) {
      this.setState({loadingState: loadingStatus.error})
    }
  };

  handleSubmit = async query => {
    if (!(!!query && query)) { // Mindfuck!
      return this.fetchPhotos(1)
    }

    // my recommendation is to set page number in the query string so that it can be linked
    // react-router would have helped a lot

    const page = this.state.currentPage;
    const {perPage} = this.state;
    const url = `${UNSPLASH_BASE_URL}/search/photos/?page=${page}&per_page=${perPage}&query=${query}&client_id=${UNSPLASH_CLIENT_ID}`;
    this.setState({loadingState: loadingStatus.loading});
    try {
      const response = await fetch(url);
      // we need to check for bad http status codes here: if (response.ok) { ... }
      const photos = await response.json();

      const totalPhotos = parseInt(response.headers.get("x-total"));
      this.setState({
        photos: photos.results,
        totalPhotos,
        currentPage: page,
        loadingState: loadingStatus.success
      })
    } catch (e) {
      this.setState({loadingState: loadingStatus.error})
    }
  };

  render() {
    return (
      <div>
        <header>
          <h1>Unsplash! <code>from API</code></h1>
        </header>
        <SearchForm onSubmit={this.handleSubmit} />
        {this.state.loadingState === loadingStatus.loading
          ? <div className="loader"></div>
          : <List data={this.state.photos} />
        }
        <Pagination
          current={this.state.currentPage}
          total={this.state.totalPhotos}
          perPage={this.state.perPage}
          pageRange={1}
          onPageChanged={this.fetchPhotos}
        />
        <footer>
          <p>Developed with ☕️ by <strong>Matias Garat Ortiz</strong></p>
        </footer>
      </div>
    );
  }
}

export default App;
