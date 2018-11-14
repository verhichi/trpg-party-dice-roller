import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoomService } from '../../../service/room.service';

@Component({
  selector: 'app-host-room',
  templateUrl: './host-room.component.html',
  styleUrls: ['./host-room.component.css']
})
export class HostRoomComponent implements OnInit {

  constructor(
    private router:      Router,
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  onClickNewRoom(){
    this.roomService.getNewRoom().subscribe((res) => {
      this.router.navigate(['/' + res['result']]);
    });
  }

}
