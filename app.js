import cx from 'classnames';
import { Component } from 'react';


export default class TodoList extends Component {

        constructor(props) {
            super(props); 

            this.state = {
                newItem: "",
                list: []
            };
        }
    updateInput(key, value) {
        // update react state
        this.setState({ [key]: value });
    }
    addItem(){
        //create unique id for items

        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };

        //copy of current list of items
        const list = [...this.state.list];

        //add new item to list
        list.push(newItem);

        //update state with new list
        this.setState({
            list,
            newItem: ""
        });
    }

    deleteItem(id) {
        const list = [...this.state.list];

        const updatedList = list.splice(id, 1);

        this.setState({
            list : updatedList
        });
    }

    crossOut() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    }


    render() {
        return (
            <>
                <div className="App">
                    <h2>
                        Todo List
                    </h2>
                    
                    <input 
                        type="text" 
                        placeholder="New Item" 
                        value = {this.state.newItem}
                        onChange = {e => this.updateInput("newItem", e.target.value)}
                    />
                    <button 
                        onClick={() => this.addItem()}
                        >Add
                    </button>

                    { /* Create count variable to record how many items are left out of the total */}
                    <p className="task-counter">{this.props.incomplete} remaining out of {this.props.total} tasks</p>
                    <ul>
                        {this.state.list.map(item => {
                        return (
                            // Trying to set the crossOut() to strikethough only after task is completed
                            <li className="is-done" onClick={() => this.deleteItem(item.id)} key={item.id}>
                             {item.value}
                            </li>
                        );
                        })}
                    </ul>
                </div>
                <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
            </>
        );
    }


}


