import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../service/web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private room_id: string;
  private self_user_id: string;
  private users = [];
  private log_array: string[] = ['New entries are inserted at the top'];

  constructor(
    private webSocket: WebSocketService,
    private route:     ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.room_id = params['room_id'];
      this.self_user_id = Math.random().toString().slice(2,11);


      const init_display_name = 'User' + Math.random().toString().slice(2,5);
      this.users.push({user_id: this.self_user_id, display_name: init_display_name, result_string: '-', total_val: '-'});


      this.webSocket.joinRoom(this.room_id);


      this.webSocket.requestAttendance(this.room_id);


      this.webSocket.onRequestAttendance(this.room_id, this.users.find((user) => user.user_id === this.self_user_id));


      this.webSocket.onAttendance().subscribe((user_info) => {
        if(!this.users.some((user) => user.user_id === user_info.user_id)){
          this.users.push(user_info);
        }
      });


      this.webSocket.onNewRoll().subscribe((roll) => {
        this.users.find((user) => user.user_id === roll.user_id).result_string = roll.result_string;
        this.users.find((user) => user.user_id === roll.user_id).total_val = roll.total_val;

        const master_start_timestamp = new Date().toLocaleString();
        this.log_array.unshift(`[${master_start_timestamp}][${this.users.find((user) => user.user_id === roll.user_id).display_name}] Result: ${roll.result_string}, Total: ${roll.total_val}`);
      });


      this.webSocket.onExit().subscribe((user_id) => {
        this.users.splice(this.users.findIndex((user) => user.user_id === user_id), 1);
      });

    });
  }

  onClearLogButton(){
    this.log_array = [];
  }

  sendRollResult(roll_result){
    this.webSocket.sendRollResult(roll_result);
  }

  ngOnDestroy(){
    this.webSocket.exitRoom(this.room_id, this.self_user_id);
  }

}
