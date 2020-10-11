import React from "react";

interface ISocketMessageState {
  ws: WebSocket;
  endpoint: string;
  sendmsg: string;
  messages: Array<string>;
}

class SocketMessage extends React.Component {
  state: ISocketMessageState;

  constructor(props: any) {
    super(props);
    this.state = {
      ws: {} as WebSocket,
      endpoint: "ws://localhost:9999",
      sendmsg: "",
      messages: [],
    };
  }

  componentDidMount() {
    // initialize connection
    const ws = new WebSocket(this.state.endpoint);

    //ws.onopen = () =>{
    //  //send any msg from Client if needed
    //  ws.send(JSON.stringify("Hello, everyone!!"))
    //}
    // save whatever response from client
    ws.onmessage = (evt) => {
      this.setState({
        messages: this.state.messages.concat(evt.data),
      });
    };

    this.setState({ws: ws})

  }

  componentWillUnmount() {
    if (this.state.ws !== undefined) {
      this.state.ws.close()
    }
    this.setState({
      endpoint: "",
      messages: [],
    });
  }


  handleMessage(event:any) {
    this.setState({sendmsg: event.target.value});
  }

  handlePushButton() {
       this.state.ws.send(JSON.stringify(this.state.sendmsg))
  }

  render() {
    return (
      <div>
        <input type="text" name="message" value={this.state.sendmsg} onChange={this.handleMessage.bind(this)} />
        <button type="button" onClick={this.handlePushButton.bind(this)}>
          Send
        </button>
        <div style={{textAlign: "left"}}>
          {this.state.messages.map((items: React.ReactNode, index: number) => (
            <li key="index">
              {index} : {items}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default SocketMessage;
