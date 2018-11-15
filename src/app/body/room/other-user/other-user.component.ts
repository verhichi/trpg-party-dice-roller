import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {

  @Input() self_user_id: string;
  @Input() users: Object;
  @Input() user_rolls: Object;

  private objectKeyFunc = Object.keys;

  constructor() { }

  ngOnInit() {
  }

}
