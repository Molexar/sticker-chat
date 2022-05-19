import React, { Component } from "react";
import {render} from "react-dom";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            placeholder: "Loading",
            image: null,
            url: null,
            auth: false
        };
    }

    componentDidMount() {
        fetch("api/chat/" + window.location.search)
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went wrong"};
                    })
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        auth: true
                    };
                });
            });
    }

    changeFile(event){
        this.setState({image: event.target.files[0]})
    }

    uploadFile(event){

    }

    createChat(event){
        fetch("api/chat/",
        ).then(
            response => {
                if (response.status > 400){
                    return {"placeholder": "something went wrong"}
                }
                return response.json();
            }
        ).then(data => {
            this.setState(() => {
                return {
                    url: data.url
                }
            })
        })
        document.getElementById("url").innerText = this.state.url;
    }

    showUrl(){
        if (this.state.url){
            return (
                <div id="new_url">
                    URL: {this.state.url}
                </div>
            )
        }
    }

    showMessages(){
        if (this.state.data){
            return (
                <img src={"" + this.state.data.images[0].image} alt="error"/>
            )
        }
    }


    render() {
        return (
            <div id="content">
                <div id="forms">
                    <div id="upload">
                        <label>
                            Upload your sticker:
                        </label>
                        <p><input type="file" onChange={this.changeFile}/><button onClick={this.uploadFile}>Upload!</button></p>
                    </div>
                    <div id="new_chat">
                    <label>
                        Create new chat:
                    </label>
                        <p><button onClick={this.createChat}>Create</button></p>
                        <p id="url">{this.showUrl()}</p>
                    </div>
                </div>
                <div id="chat">
                {this.showMessages()}
                </div>
            </div>
        );
    }
}

export default App;

const container = document.getElementById("app")
render(<App />, container)