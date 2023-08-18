import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../service/socket-service.service';
import { player } from '../service/PlayerModel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  squares: any = [];
  xIsNext = true;
  winner = '';
  counter = 0;
  isdraw = '';
  freshpage = true;
  currentPlayer: player = { id: '', selection: '' };
  constructor(private socketService: SocketServiceService) {}

  ngOnInit(): void {
    this.socketService.getPosition().subscribe((res) => {
      console.log(res);
      if (res.index !== 10) {
        this.move(res.index, res.selection);
      }
    });

    // this.socketService.getPlayerSelection().subscribe((player: player) => {
    //   this.currentPlayer.id = player.id;
    //   console.log(player);
    // });
  }
  selectPlayer(selection: string) {
    this.currentPlayer.id = this.socketService.getId();
    this.currentPlayer.selection = selection;
    this.socketService.sendPlayerSelection(this.currentPlayer);
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.isdraw = '';
    this.counter = 0;
    this.freshpage = false;
  }

  makeMove(index: number, selection: string) {
    this.move(index, selection);
    this.socketService.sendPosition({ index, selection });
  }
  move(index: number, selection: string) {
    if (!this.squares[index]) {
      // Oyuncunun hamlesini sunucuya gönderiyoruz

      // Oyuncunun hamlesini yerel olarak güncelliyoruz
      this.squares.splice(index, 1, selection);
      // this.xIsNext = !this.xIsNext;
      this.counter++;
    }

    // Kazananı kontrol ediyoruz
    this.winner = this.calculateWinner();

    // Berabere durumunu kontrol ediyoruz
    if (!this.winner && this.counter === 9) {
      this.isdraw = 'yes';
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 2, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
