import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-self-user',
  templateUrl: './self-user.component.html',
  styleUrls: ['./self-user.component.css']
})
export class SelfUserComponent implements OnInit {

  @Input() room_id: string;
  @Output() onRollClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(dice_count: number, dice_type: number, bonus_symbol: string, bonus_val: number){
    const dice_setting = {dice_count, dice_type, bonus_symbol, bonus_val}
    this.onRollClick.emit(dice_setting);
  }

}
