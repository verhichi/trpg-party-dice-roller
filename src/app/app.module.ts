import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { LobbyComponent } from './body/lobby/lobby.component';
import { RoomComponent } from './body/room/room.component';
import { JoinRoomComponent } from './body/lobby/join-room/join-room.component';
import { HostRoomComponent } from './body/lobby/host-room/host-room.component';
import { SelfUserComponent } from './body/room/self-user/self-user.component';
import { OtherUserComponent } from './body/room/other-user/other-user.component';
import { LogComponent } from './body/room/log/log.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    LobbyComponent,
    RoomComponent,
    JoinRoomComponent,
    HostRoomComponent,
    SelfUserComponent,
    OtherUserComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
