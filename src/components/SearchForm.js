import React, {Component} from "react";

class SearchForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const value = this.input.value
    return this.props.onSubmit(value)
  }

  render() {
    return (
      <form className="search_form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search images" ref={(input) => this.input = input}/>
      </form>
    )
  }
}

export default SearchForm
