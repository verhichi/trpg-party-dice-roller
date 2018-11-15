import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoomService } from '../../../service/room.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  constructor(
    private router:      Router,
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  onClickJoinRoom(room_id){
    if(room_id.length < 4){
      alert('Please enter the 4 digit Room ID correctly!');
    } else {
      this.roomService.checkRoomId(room_id).subscribe((res) => {
        if(res['result']){
          this.router.navigate(['/' + room_id]);
        } else {
          alert(`Room ID: ${room_id} does not exist`);
        }
      });
    }
  }

}
