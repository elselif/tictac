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

   getPosition(): Observable<number> {
    let index : BehaviorSubject <number> = new BehaviorSubject<number>(0)
    this.socket.on('positionResponse',(data:number )=> {

      index.next(data)
      return index.asObservable()
    });
    index.next(10)
    return index.asObservable();
   }

   



}
