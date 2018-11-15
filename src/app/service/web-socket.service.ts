import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {

  socket: SocketIOClient.Socket;
  url: string = 'http://192.168.1.200:3000';

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(room_id: string){
    this.socket.emit('join', room_id);

    return Observable.create(observer => {
      this.socket.on('room_info', (room_info) => {
        observer.next(room_info);
      });
    });
  }

  rollDice(room_id: string, user_id: string, dice_count: number, dice_type: number, bonus_symbol: string, bonus_val: number){
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
      room_id: room_id,
      user_id: user_id,
      result_string: result_string,
      total_val: total_val
    };

    this.socket.emit('roll', roll_result);
  }

  onNewRoll(){
    return Observable.create(observer => {
      this.socket.on('roll', (roll) => {
        observer.next(roll);
      });
    });
  }

}
