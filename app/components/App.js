import React from 'react';
import ReactDOM from 'react-dom';


class InputArea extends React.Component {
    render() {
        return (
            <form onSubmit={(event) => this.props.onSubmit(event)}>
                <label>
                    <textarea value={this.props.value} onChange={(event) => this.props.onChange(event)} />
                </label>
                <br />
                <input type="submit" value={this.props.submitText} />
            </form>
        );
    }
}

class RandomizerArea extends React.Component {
    constructor(props) {
        super(props);
        // this.props.randomizer = new NameShuffler();
        this.state = {
            randomizations: 0,
            input: "Joe\nNancy\nJong",
            output: RandomizerArea._shuffle(["Joe", "Nancy", "Jong"])
        };

        // this._randomize();
        // this commit has no meaning

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({input: event.target.value});
    }

    handleSubmit(event) {
        // var shuffledList = RandomizerArea._randomize(this.state.input);
        this._randomize();
        // var list = [this.state.input];
        // this.setState({output: list});
        // alert('The following was submitted: ' + this.state.input);
        event.preventDefault();
    }

    _checkRiggedConditions() {
        var result = false;
        var totalRandomizations = this.state.randomizations;
        if ((totalRandomizations % RandomizerArea._parseList(this.state.input).length) + 3 == 0) {
            result = true;
        }
        return result;
    }

    static _swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    static _removeElement(arr, elem) {
        var index = arr.indexOf(elem);
        while (index > -1) {
            arr.splice(index, 1);
            index = arr.indexOf(elem);
        }
    }

    _randomize() {
        var inputStr = this.state.input;

        var list = RandomizerArea._parseList(inputStr);
        var shuffledList = RandomizerArea._shuffle(list);

        RandomizerArea._removeElement(shuffledList, "");

        if (this._checkRiggedConditions()) {
            var index = shuffledList.indexOf(this.props.riggedName);
            if (index != -1) {
                RandomizerArea._swap(shuffledList, 0, index);
            }
        }

        var totalRandomizations = this.state.randomizations + 1;
        this.setState({
            output: shuffledList,
            randomizations: totalRandomizations
        });
        // return shuffledList;
    }

    static _parseList(str) {
        var list = str.split("\n");

        return list;
    }

    static _shuffle(arr) {
        var currentIndex = arr.length, temp, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temp = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temp;
        }

        return arr;
    }

    render() {
        return (
            <div>
                <h3>Input</h3>
                <InputArea
                    value={this.state.input}
                    onChange={(event) => this.handleChange(event)}
                    onSubmit={(event) => this.handleSubmit(event)}
                    submitText="Randomize"
                />
                <h3>Output</h3>
                <List
                    items={this.state.output}
                />
            </div>
        );
    }
}

class List extends React.Component {
    render() {
        var content = [];
        for (var i = 0; i < this.props.items.length; i++) {
            content.push(<Item name={this.props.items[i]} key={i} />);
        }
        return (
            <ol>
                {content}
            </ol>
        );
    }
}

class Item extends React.Component {
    render() {
        return <li> {this.props.name} </li>;
    }
}

export class App extends React.Component {
    render() {
        return (
            <div>
                <h1> The Name Shuffler </h1>
                <p> Enter a list of names separated by line breaks. The Name Shuffler will use this to generate a randomized list of names. </p>
                <RandomizerArea riggedName="Cassidy Bollman"/>
            </div>
        );
    }
}
