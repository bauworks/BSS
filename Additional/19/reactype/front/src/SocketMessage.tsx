import React, {useEffect, useState} from "react";

const SocketMessage:React.FC = () => {

  const [ws, setWs] = useState<WebSocket>({} as WebSocket);
  const [sendmsg, setSendmsg] = useState<string>("");
  const [messages, setMessages] = useState<Array<string>>(["default"]);
  const endpoint = "ws://localhost:9999";
  

  useEffect(() => {
    // componentDidMount
    const ws = new WebSocket(endpoint);
    setWs(ws);

    return () => {
      // componentWillUnmount
      if (ws !== undefined) {
        ws.close();
      }
      setMessages([]);
    }
  }, []);


  useEffect(() => {
    ws.onmessage = (evt) => {
      setMessages(messages.concat(evt.data));
    }  
  })


  const handleMessage = (event:any) => {
    setSendmsg(event.target.value);
  }


  const handlePushButton = () => {
       ws.send(JSON.stringify(sendmsg))
       setSendmsg("")
  }

  return (
    <div>
      <input type="text" name="message" value={sendmsg} onChange={handleMessage} />
      <button type="button" onClick={handlePushButton}>
        Send
      </button>
      <div style={{textAlign: "left"}}>
        {messages.map((items: React.ReactNode, index: number) => (
          <li key="index">
            {index} : {items}
          </li>
        ))}
      </div>
    </div>
  );
}

export default SocketMessage;
