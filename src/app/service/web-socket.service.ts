import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinRoom(room_id: string){
    this.socket.emit('join', room_id);
  }

  sendMessage(msg: string){
    this.socket.emit('msg', {msg: msg});
  }

  onNewMessage(){
    return Observable.create(observer => {
      this.socket.on('msg', msg => {
        observer.next(msg);
      });
    });
  }

}
