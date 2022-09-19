import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, rise: true, id:1},
        {name: 'Alex W.', salary: 3000, increase: true, rise: false, id:2},
        {name: 'Carl W..', salary: 5000, increase: false, rise: false, id:3}
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }
  
  deleteItem = (id) => {
    this.setState(({data}) => {
      //const index = data.findIndex(elem => elem.id === id)
      return {
        data: data.filter(item => item.id !== id) //дані відфільтруються і залишуться лише ті елементи, айді яких не співпадає з айді, що прийшов 
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem]
      return {
        data: newArr
      }
    });
  }

  onToggleIncrease = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, increase: !item.increase}
        }
        return item
      })
    }))
  }

  onToggleRise = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, rise: !item.rise}
        }
        return item
      })
    }))
  }

  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdadateSearch = (term) => {
    this.setState({term}); // те саме шо term: term
  }

 filterPost = (items, filter) => {
    switch(filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000)
      case 'willReceiveAPrize':
        return items.filter(item => item.increase)
      default:
        return items
    }
}

onFilterSelect = (filter) => {
  this.setState({filter});
}


  render() {
    const {data, term, filter} = this.state;

    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
          <AppInfo 
          employees={employees}
          increased={increased}/>
  
          <div className="search-panel">
              <SearchPanel onUpdadateSearch={this.onUpdadateSearch}/>
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
          </div> 
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleIncrease={this.onToggleIncrease}
            onToggleRise={this.onToggleRise}/>
          <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
