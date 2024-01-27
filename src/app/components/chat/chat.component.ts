import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { ChatMessage } from '../../models/ChatMessage';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  messageInput = new FormControl('');
  userId: string = "";
  messageList: any[] = [];


  constructor(private chatService: ChatService, private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom("ABC");
    this.listenerMessage();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput.value,
      user: this.userId
    } as ChatMessage;
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput.setValue("");
  }

  listenerMessage() {
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      console.log(messages);
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }));
    });
  }
}
