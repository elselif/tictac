import { Injectable } from '@angular/core';
import {io, Socket } from 'socket.io-client';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  private socket: Socket;


  constructor() {
    this.socket = io('http://localhost:3000')
   }

   sendPlayerSelection(player: string) {
    this.socket.emit('playerSelection', player);
  }

  getPlayerSelection(): Observable<string> {
    let playerSelectionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    this.socket.on('playerType', (data: string) => {
      playerSelectionSubject.next(data);
      
    });

    return playerSelectionSubject.asObservable();
  }

   getPosition(): Observable<number> {
    let index : BehaviorSubject <number> = new BehaviorSubject<number>(0)
    this.socket.on('positionResponse',(data:number )=> {

      index.next(data)
      return index.asObservable()
    });
    index.next(10)
    return index.asObservable();
   }

   sendPosition(index:number) {
    console.log("send")
    this.socket.emit('position',index);
   }



}
