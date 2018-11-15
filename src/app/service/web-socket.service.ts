import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {

  private socket: SocketIOClient.Socket;
  private url: string = 'http://localhost:3000';

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

}
