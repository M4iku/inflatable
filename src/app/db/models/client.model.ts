export type ClientStatus = 'waiting' | 'playing' | 'finished' | 'cancelled';

export interface Client {
  id?: number;
  name: string;
  gameName: string;

  // Monto total pagado (sumatoria si amplía tiempo)
  totalAmount: number;

  // Tiempo total comprado (en segundos)
  totalSecondsPaid: number;

  // Tiempos clave (timestamp)
  createdAt: number;        // Cuándo se agregó a la lista
  startedAt?: number;       // Cuándo comenzó a jugar
  endedAt?: number;         // Cuándo terminó (si terminó)
  cancelledAt?: number;     // Si se canceló

  // Estado actual
  status: ClientStatus;

  // Historial de recargas
  topUps?: {
    timestamp: number;
    amount: number;
    seconds: number;
  }[];
}
