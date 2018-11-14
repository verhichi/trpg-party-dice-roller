import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../service/web-socket.service';


@Component({
  selector: 'app-host-room',
  templateUrl: './host-room.component.html',
  styleUrls: ['./host-room.component.css']
})
export class HostRoomComponent implements OnInit {

  msgInput: string = 'lorem ipsum';

  constructor(
    private webSocket: WebSocketService
  ) { }

  ngOnInit() {
    this.webSocket.onNewMessage().subscribe((msg) => {
      console.log(msg);
    });
  }

  sendButtonClick(){
    this.webSocket.sendMessage(this.msgInput);
  }

}
