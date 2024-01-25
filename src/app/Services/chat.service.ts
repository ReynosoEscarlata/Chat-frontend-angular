import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;

  constructor() { 
    this.initConnectionSocket();
  }

  initConnectionSocket(){
    const url = 'http://localhost:3000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string){
    this.stompClient.connect({},()=>{
      this.stompClient.suscribe(`/topic/${roomId}`, function(messages: any){
        console.log(messages);
      });
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage){
    console.log(JSON.stringify(chatMessage));
    const resp = this.stompClient.send(`/app/chat/${roomId}`, JSON.stringify(chatMessage));
    console.log(resp);
  }
}
