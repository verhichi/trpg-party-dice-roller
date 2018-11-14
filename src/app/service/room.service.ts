import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  getNewRoom(){
    const url = '/new_room_id';

    return this.http.get(url);
  }

  checkRoomId(room_id: string){
    const url = '/check_room_id';
    const query = {params: new HttpParams().set('room_id', room_id)};

    return this.http.get(url, query);
  }

}
