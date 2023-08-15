import { Component, Input, OnInit } from '@angular/core';
import { SocketServiceService } from '../service/socket-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() value: 'X' | 'O' | undefined
  constructor(private socketService : SocketServiceService) {


   }

  ngOnInit(): void {

  }

  


}
