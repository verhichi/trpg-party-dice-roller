import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoomService } from '../../../service/room.service';

@Component({
  selector: 'app-host-room',
  templateUrl: './host-room.component.html',
  styleUrls: ['./host-room.component.css']
})
export class HostRoomComponent implements OnInit {

  constructor(
    private router:      Router,
    private route:       ActivatedRoute,
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  onClickNewRoom(){
    this.route.params.subscribe((params) => {
      this.router.navigate(['/' + params.result]);
    });
  }

}
