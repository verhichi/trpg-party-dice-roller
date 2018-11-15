import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from './body/lobby/lobby.component';
import { RoomComponent } from './body/room/room.component';

const myRoutes = [
  {path: ':room_id', component: RoomComponent},
  {path: '**', component: LobbyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(myRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
