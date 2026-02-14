import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
const USE_MOCK_SOCKET = import.meta.env.VITE_USE_MOCK_API === 'true' || !import.meta.env.VITE_SOCKET_URL;

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;

  connect(token: string): Socket {
    if (this.socket?.connected) return this.socket;

    // Use mock socket when backend is not available
    if (USE_MOCK_SOCKET) {
      console.log('[Socket] Using mock socket service');
      return this.createMockSocket();
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    this.socket.on('connect', () => {
      console.log('[Socket] Connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error.message);
      this.reconnectAttempts++;
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRideRoom(rideId: string) {
    this.socket?.emit('join:ride', { rideId });
  }

  leaveRideRoom(rideId: string) {
    this.socket?.emit('leave:ride', { rideId });
  }

  sendLocation(lat: number, lng: number) {
    this.socket?.emit('driver:location', { lat, lng });
  }

  onDriverLocation(callback: (data: { lat: number; lng: number }) => void) {
    this.socket?.on('driver:location:update', callback);
    return () => { this.socket?.off('driver:location:update', callback); };
  }

  onRideUpdate(callback: (data: any) => void) {
    this.socket?.on('ride:update', callback);
    return () => { this.socket?.off('ride:update', callback); };
  }

  onRideAssigned(callback: (data: any) => void) {
    this.socket?.on('ride:assigned', callback);
    return () => { this.socket?.off('ride:assigned', callback); };
  }

  onNewRideRequest(callback: (data: any) => void) {
    this.socket?.on('ride:new_request', callback);
    return () => { this.socket?.off('ride:new_request', callback); };
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  private createMockSocket(): Socket {
    // Create a mock socket that mimics the Socket.IO interface
    const mockSocket = {
      connected: true,
      on: (event: string, callback: Function) => {
        console.log(`[Mock Socket] Registered listener for: ${event}`);
      },
      off: (event: string, callback?: Function) => {
        console.log(`[Mock Socket] Removed listener for: ${event}`);
      },
      emit: (event: string, data?: any) => {
        console.log(`[Mock Socket] Emitted: ${event}`, data);
      },
      disconnect: () => {
        console.log('[Mock Socket] Disconnected');
        mockSocket.connected = false;
      },
    } as any;

    this.socket = mockSocket;
    setTimeout(() => {
      console.log('[Mock Socket] Connected');
    }, 100);
    
    return mockSocket;
  }
}

export const socketService = new SocketService();
export default socketService;
