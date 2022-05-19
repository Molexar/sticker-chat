import React, { Component } from "react";
import {render} from "react-dom";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loaded: false,
            placeholder: "Loading",
            image: null,
            url: null
        };
    }

    componentDidMount() {
        fetch("api/chat/1/?token=5550fa0d-d9a3-4303-94d4-d3a9b3825852")
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
                        loaded: true
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


    render() {
        return (
            <div id="content">
                <div id="forms">
                    <div id="upload">
                        <label>
                            Upload your sticker:
                            <input type="file" onChange={this.changeFile}/>
                        </label>
                        <p><button onClick={this.uploadFile}>Upload!</button></p>
                    </div>
                    <div id="new_chat">
                    <label>
                        Create new chat:
                    </label>
                        <p><button onClick={this.createChat}>Create</button></p>
                        <p id="url"></p>
                    </div>
                </div>
                <div id="chat">
                    <label>Your sticker chat: </label>

                </div>
            </div>
        );
    }
}

export default App;

const container = document.getElementById("app")
render(<App />, container)