import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { ChatMessage } from '../../models/ChatMessage';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  constructor(private chatService: ChatService){

  }

  ngOnInit(): void {
      this.chatService.joinRoom("ABC");
  }

  sendMessage(){
    const chatMessage = {
      message :'Holaaaa',
      user:'1'
    }  as ChatMessage;

    this.chatService.sendMessage("ABC", chatMessage);
  }

}
