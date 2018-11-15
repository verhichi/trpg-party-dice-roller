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
  private self_user_id: string;
  private users: Object;
  private user_rolls: Object = {};

  constructor(
    private webSocket: WebSocketService,
    private route:     ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.room_id = params['room_id'];

      this.webSocket.joinRoom(this.room_id).subscribe((room_info) => {
        this.self_user_id = room_info['self'];
        this.users = room_info['users'];

        for (let user_id in this.users){
          if(!this.user_rolls[user_id]){
            this.user_rolls[user_id] = {result_str: '-', total_val: '-'};
          }
        }
      });

      this.webSocket.onNewRoll().subscribe((roll) => {
        this.user_rolls[roll.user_id] = roll['result'];
        console.log(this.user_rolls);
      });

    });
  }

  sendRoll(dice_setting){
    this.webSocket.rollDice(this.room_id, this.self_user_id, dice_setting.dice_count, dice_setting.dice_type, dice_setting.bonus_symbol, dice_setting.bonus_val);
  }

}
