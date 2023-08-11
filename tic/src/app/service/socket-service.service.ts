import { Injectable } from '@angular/core';
import {io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4200')
   }

   getSocket(): Socket {
    return this.socket;
   }
}
