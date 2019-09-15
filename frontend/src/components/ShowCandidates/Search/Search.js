import React from "react";
import { searchPhraseFilter } from "../../../scripts/filterFunction";

class Search extends React.Component {
  state = { value: "" };

  inputHandler = e => {
    const value = e.target.value;

    this.setState({
      value
    });

    this.props.removeFilter(searchPhraseFilter.name);
    if (value.length >= 1)
      this.props.addFilter(searchPhraseFilter(value), searchPhraseFilter.name);
  };

  render() {
    return (
      <div>
        <input
          onChange={this.inputHandler}
          type="text"
          value={this.state.value}
          placeholder={"search candidate..."}
        />
      </div>
    );
  }
}

export default Search;
