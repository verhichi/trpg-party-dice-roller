import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() log_array: string[];
  @Output() onClearLogButton = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.onClearLogButton.emit();
  }

}
