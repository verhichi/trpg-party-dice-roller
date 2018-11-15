import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-self-user',
  templateUrl: './self-user.component.html',
  styleUrls: ['./self-user.component.css']
})
export class SelfUserComponent implements OnInit {

  @Input() room_id: string;
  @Input() self_user_id: string;
  @Input() users;
  @Output() onRollClick = new EventEmitter();

  private self_user;

  constructor() { }

  ngOnInit() {
    this.self_user = this.users.find((user) => user.user_id === this.self_user_id);
  }

  onClick(dice_count: number, dice_type: number, bonus_symbol: string, bonus_val: number){
    let result = [];

    for(let idx = 0; idx < dice_count; idx++){
      const roll = Math.floor(Math.random() * dice_type) + 1
      result.push(roll);
    }

    const result_string = result.join(', ') + '(' + bonus_symbol + bonus_val + ')';

    const total_val = result.reduce(function(prev, next){
      return prev + next;
    }, Number(bonus_symbol + bonus_val));

    const roll_result = {
      room_id: this.room_id,
      user_id: this.self_user_id,
      result_string: result_string,
      total_val: total_val
    };

    this.onRollClick.emit(roll_result);
  }

}
