import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
   constructor(props) {
    super(props) 
        this.state = {
            term: ''
        }
    }
   
    onUpdadateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdadateSearch(term) //прокидуємо на верх
    }

    render() {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Знайти працівника"
                    value={this.state.term}
                    onChange={this.onUpdadateSearch}/>
        )
    }
   
}

export default SearchPanel;