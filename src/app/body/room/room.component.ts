import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private room_id: string;

  constructor(
    private webSocket: WebSocketService,
    private route:     ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.room_id = params['room_id'];
      this.webSocket.joinRoom(this.room_id);
    });
  }

}
