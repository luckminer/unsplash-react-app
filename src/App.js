import React, { Component } from 'react';

import SearchForm from './components/SearchForm'
import List from './components/List'
import Pagination from './components/Pagination'

import './App.css';

const loadingStatus = {
  success: 'Success',
  error: 'Error',
  loading: 'Loading'
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
      totalPhotos: 0,
      perPage: 9,
      currentPage: 1,
      loadingState: loadingStatus.loading
    }
    this.fetchPhotos = this.fetchPhotos.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchPhotos(this.state.currentPage)
  }

  fetchPhotos = async page => {
    const {perPage} = this.state;
    const baseUrl = 'https://api.unsplash.com/photos/';
    const clientId = '66abcfa9888252541322564391c295b0e87d52e11997cfd76176e37db4bfccbb';
    const url = `${baseUrl}?page=${page}&per_page=${perPage}&client_id=${clientId}`
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
  }

  handleSubmit = async query => {
    if (!(!!query && query)) {
      return this.fetchPhotos(1)
    }

    const page = this.state.currentPage
    const {perPage} = this.state;
    const baseUrl = 'https://api.unsplash.com/search/photos/';
    const clientId = '66abcfa9888252541322564391c295b0e87d52e11997cfd76176e37db4bfccbb';
    const url = `${baseUrl}?page=${page}&per_page=${perPage}&query=${query}&client_id=${clientId}`
    this.setState({loadingState: loadingStatus.loading});
    try {
      const response = await fetch(url);
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
  }

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
          onPageChanged={this.fetchPhotos.bind(this)}
        />
        <footer>
          <p>Developed with ☕️ by <strong>Matias Garat Ortiz</strong></p>
        </footer>
      </div>
    );
  }
}

export default App;
