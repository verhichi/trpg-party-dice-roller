import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { LobbyComponent } from './body/lobby/lobby.component';
import { RoomComponent } from './body/room/room.component';
import { JoinRoomComponent } from './body/lobby/join-room/join-room.component';
import { HostRoomComponent } from './body/lobby/host-room/host-room.component';

import { AppRoutingModule } from './app-routing.module';
import { LogComponent } from './body/room/log/log.component';
import { OtherUserComponent } from './body/room/other-user/other-user.component';
import { SelfUserComponent } from './body/room/self-user/self-user.component';

import { WebSocketService } from './service/web-socket.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    LobbyComponent,
    RoomComponent,
    JoinRoomComponent,
    HostRoomComponent,
    LogComponent,
    OtherUserComponent,
    SelfUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: WebSocketService, useClass: WebSocketService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
