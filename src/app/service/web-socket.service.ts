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
  }

  requestAttendance(room_id){
    this.socket.emit('request_attendance', room_id);
  }

  onRequestAttendance(room_id, user_info){
    this.socket.on('request_attendance', () => {
      this.socket.emit('attendance', room_id, user_info);
    });
  }

  onAttendance(){
    return Observable.create(observer => {
      this.socket.on('attendance', (user_info) => {
        observer.next(user_info);
      });
    });
  }

  sendRollResult(roll_result){
    this.socket.emit('roll', roll_result);
  }

  onNewRoll(){
    return Observable.create(observer => {
      this.socket.on('roll', (roll) => {
        observer.next(roll);
      });
    });
  }

  exitRoom(room_id, user_id){
    this.socket.emit('exit', room_id, user_id);
  }

  onExit(){
    return Observable.create(observer => {
      this.socket.on('exit', (user_id) => {
        observer.next(user_id);
      });
    });
  }

}
