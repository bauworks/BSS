# coding=utf-8

from websocket_server import WebsocketServer
from datetime import datetime

def new_client(client, server):
    server.send_message_to_all(datetime.now().isoformat() + ": new client joined!")
    print("Request received.")

def receivedMessage(client, server, message):
    server.send_message_to_all("recived message: " + message)
    print (message)

server = WebsocketServer(9999, host="bauserver")
server.set_fn_new_client(new_client)
server.set_fn_message_received(receivedMessage)
server.run_forever()
