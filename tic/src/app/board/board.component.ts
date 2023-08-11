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
    const socket = this.socketService.getSocket();

   }

  ngOnInit(): void {
    const socket = this.socketService.getSocket();

    socket.emit('playerMove', { value: this.value });
  }

  makeMove(row: number, col: number) {
    const socket = this.socketService.getSocket();

    // Kullanıcının hamlesini yapma işlemi
    socket.emit('playerMove', { value: this.value, row, col });
  }


}
