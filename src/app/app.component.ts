import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DemoService} from './demo.service';
import {Observable} from 'rxjs/Rx';
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message = 'ClickMe';
  game="";
  isDisabled=false;
  isGameOn=false;
  counter=0;
  timer0Id: string;
  
  
  openDialog() {
    
    this.message = (this.message == 'ClickMe') ? 'Clicked' : "Too Late";
    this.isDisabled=true;
    this.unSubscribeTimer0();
    //console.log("Clicked!");
  };
  startGame() {
    this.isGameOn=true;
    this._demoService.startGame().subscribe(
      data => { this.game = String(data)},
      err => console.error(err),
      () => console.log('done loading foods')
    );
    this.st.newTimer('1sec',0.1);
    this.subscribeTimer0();
    this.subscribeToEvents();
  }
  subscribeToEvents() {
    var myApp = this;
    var ws = new WebSocket('ws://localhost:40510');
    // event emmited when connected
    ws.onopen = function () {
        console.log('websocket is connected ...')
        // sending a send event to websocket server
        ws.send('connected')
    }
    // event emmited when receiving message 
    ws.onmessage = function (ev) {
      console.log(ev);
      myApp.openDialog();
    }
  }
  timer0callback() {
		this.counter=this.counter+0.1;
	}
  subscribeTimer0() {
		this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
  }
  unSubscribeTimer0() {
		this.st.unsubscribe(this.timer0Id);
  }
  
  constructor(private _demoService: DemoService, private st: SimpleTimer) { }
}
