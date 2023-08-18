import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { player } from './PlayerModel';

@Injectable({
  providedIn: 'root',
})
export class SocketServiceService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendPlayerSelection(currentPlayer: player) {
    this.socket.emit('selection', currentPlayer);
  }

  getPlayerSelection(): Observable<player> {
    let currentPlayer: BehaviorSubject<player> = new BehaviorSubject<player>({
      id: '',
      selection: '',
    });

    this.socket.on('currentPlayer', (data: player) => {
      currentPlayer.next(data);
    });

    return currentPlayer.asObservable();
  }

  getPosition(): Observable<{ index: number; selection: string }> {
    let index: BehaviorSubject<{ index: number; selection: string }> =
      new BehaviorSubject<{ index: number; selection: string }>({
        index: 0,
        selection: '',
      });
    this.socket.on(
      'positionResponse',
      (data: { index: number; selection: string }) => {
        index.next(data);
        return index.asObservable();
      }
    );
    index.next({ index: 10, selection: '' });
    return index.asObservable();
  }

  sendPosition(position: { index: number; selection: string }) {
    console.log('send', position);
    this.socket.emit('position', position);
  }
  getId() {
    return this.socket.id;
  }
}
