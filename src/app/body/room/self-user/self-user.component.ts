import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-self-user',
  templateUrl: './self-user.component.html',
  styleUrls: ['./self-user.component.css']
})
export class SelfUserComponent implements OnInit {

  @Input() room_id: string;

  constructor() { }

  ngOnInit() {
  }

}
