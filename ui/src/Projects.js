import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './Projects.css';

async function joinProjectBackend(param){
    const url = '/joinProject/'+ param;
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
    alert('Joined ' + data)
    return data;    
}

async function leaveProjectBackend(param){
    const url = '/leaveProject/'+ param;
    const response = await fetch(url);
    const data = await response.text();
    console.log(data);
    alert('Left ' + data)
    return data;
}

async function checkInHardware(id, qty){
    const url = '/checkIn/'+ id + '/' + qty;
    const response = await fetch(url);
    const data = await response.json();
    const name = data.Projectid;
    const q = data.Qty;
    console.log(name + ' checked in ' + q + 'hardware');
    alert(name + ' checked in ' + q + 'hardware');
}

async function checkOutHardware(id, qty){
    const url = '/checkOut/'+ id + '/' + qty;
    const response = await fetch(url);
    const data = await response.json();
    const name = data.Projectid;
    const q = data.Qty;
    console.log(name + ' checked out ' + q + 'hardware');
    alert(name + ' checked out ' + q + ' hardware');
}
function GenButton(props){   
        return(
            <Button className = "Button" variant = "outlined" onClick = {props.onClick}>{props.value}</Button>
        )    
}
function JoinButton(props){
    return(
        <Button className = "Button" variant = "contained" onClick = {props.onClick}>{props.value}</Button>   //Material UI Component 1
    )
}
class Entry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            joinButton: 'Join',
            isJoined: false,
            set1Val: 0,
            set2Val: 0
        };
    }
    handleClick(){
        let button = this.state.joinButton;
        button = this.state.isJoined ? 'Join' : 'Leave';
        if(!this.state.isJoined){
            joinProjectBackend(this.props.value);           
        }
        else{
            leaveProjectBackend(this.props.value);
        }
        this.setState({
            joinButton: button,
            isJoined: !this.state.isJoined
        })
    }
    handleGenClick(name, set){
        if(name == 'Check In'){
            if(set == 'Set1'){               
                checkInHardware(this.props.value, this.state.set1Val);
            }
            else{
                checkInHardware(this.props.value, this.state.set2Val);
            }
        }
        else{
            if(set == 'Set1'){               
                checkOutHardware(this.props.value, this.state.set1Val);
            }
            else{
                checkOutHardware(this.props.value, this.state.set2Val);
            }
        }
    }
    renderJoinButton(){
        return <JoinButton value = {this.state.joinButton} onClick={() => this.handleClick()}/>;
    }
    renderGenButton(name, set){
        return <GenButton id = {set} value = {name} onClick = {() => this.handleGenClick(name, set)}/>;
    }
    handleSet1Change(param){
        //console.log(param);
        this.setState({
            set1Val: param
        });
    }
    handleSet2Change(param){
        //console.log(param);
        this.setState({
            set2Val: param
        });
    }
    render(){
        return(
            <div className = "Project">
                <div className = "PName">
                    <h1>{this.props.value}</h1>
                </div>
                <div className="Set1">
                    Umar, John 
                    <b id = "b">HWSet1: 50/100</b>                    
                    <TextField id="outlinedset1" label="Enter Qty" variant="outlined" onChange = {(event) => this.handleSet1Change(event.target.value)}/>
                    {this.renderGenButton('Check In', 'Set1')}
                    {this.renderGenButton('Check Out', 'Set1')}
                    {this.renderJoinButton()}                   
                </div>
                <div className="Set2">      
                    Umar, John 
                    <b id = "b">HWSet2: 0/100</b>
                    
                    <TextField id="outlinedset2" label="Enter Qty" variant="outlined" onChange = {(event) => this.handleSet2Change(event.target.value)}/>
                    {this.renderGenButton('Check In', 'Set2')}
                    {this.renderGenButton('Check Out', 'Set2')}                   
                </div>
            </div>
        );
    }

}
class Projects extends React.Component {
    render() {
        return (
            <div className="Projects">
                <h2>Projects</h2>
                <div className="Entrys">
                    <Entry value = {'Project_Name_1'}/>
                    <Entry value = {'Project Name 2'}/>
                    <Entry value = {'Project Name 3'}/>
                </div>

            </div>
        );
    }
}

export default Projects;