import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Clock />
                <Clock />
                <Clock />
            </div>
        )
    }
}

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    }

    render() {
        return (
            <button onClick={this.handleClick.bind(this)}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }
}

function UserGreeting() {
    return (
        <h1>Welcome back!</h1>
    )
}

function GuestGreeting() {
    return (
        <h1>Please Sign up.</h1>
    )
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />
    }
    return <GuestGreeting />
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    )
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    )
}

class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />
        }else{
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn} />
                {button}
            </div>
        )
    }

    handleLoginClick() {
        this.setState({
            isLoggedIn: true
        })
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn: false
        })
    }
}

function NumberList(props) {
    let numbers = props.numbers;
    const listItems = numbers.map( num =>
        <li key={num.toString()}>
            {num}
        </li>
    );

    return (
        <ul>
            {listItems}
        </ul>
    )
}

const numbers = [1,2,3,4,5];

function ListItem(props) {
    return <li>{props.value}</li>
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map( number => (
        <ListItem key={number.toString()} value={number} />
    ) );

    return (
        <ul>
            {listItems}
        </ul>
    )
}

class EssayForm extends Component {
    constructor(props){
        super(props);
        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        }
    }

    handlerChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    handleSubmit(event) {
        alert('An essay is submitted ' + this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <textarea value={this.state.value} onChange={this.handlerChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

class FlavorForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'coconut'
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    
    render(){
        return (
            <form>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">grapefruit</option>
                    <option value="lime">lime</option>
                    <option value="coconut">coconut</option>
                    <option value="mango">mango</option>
                </select>
            </form>
        )
    }
}

function toCelsius(celsius) {
    return (celsius - 32) * 5 / 9
}

function toFahrenheit(fahrenheit) {
    return fahrenheit * 9 / 5 + 32
}

function tryConvert(temperature,convert) {
    let input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return ''
    }
    let rounded = convert(Math.round(input * 1000) / 1000);
    return rounded.toString();
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function BoilingVerdict(props) {
    const temperature = props.celsius;
    if(temperature >= 100){
        return <div>The water would boil!</div>
    }
    return <div>The water would not boil</div>
}

class TemperatureInput extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input type="text" value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 'c',
            temperature: ''
        };
        this.handlerCelsiusChange = this.handlerCelsiusChange.bind(this);
        this.handlerFahrenheitChange = this.handlerFahrenheitChange.bind(this);
    }

    handlerCelsiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature: temperature
        })
    }

    handlerFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature: temperature
        })
    }

    render() {
        const temperature = this.state.temperature;
        const celsius = this.state.scale === 'f' ? tryConvert(temperature,toCelsius) : temperature;
        const fahrenheit = this.state.scale === 'c' ? tryConvert(temperature,toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handlerCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handlerFahrenheitChange} />
                <BoilingVerdict celsius={celsius} />
            </div>
        )
    }

}

class FancyBorder extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className={'FancyBorder FancyBorder-' + this.props.color}>
                {this.props.children}
            </div>
        )
    }
}

function Contact() {

}

function Dialog(props) {
    return (
        <FancyBorder color="blue" children={Contact}>
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
            {props.children}
        </FancyBorder>
    )
}

function WelcomeDialog() {
    return <Dialog title="Welcome" message="Thank you for visiting our spacecraft" />
}

function Contacts() {
    return (
        <div className="Contacts"></div>
    )
}

function Chat() {
    return (
        <div className="Chat"></div>
    )
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}

function App1() {
    return (
        <SplitPane left={
            <Contacts />
        } right={
            <Chat />
        } />
    )
}

export default App1