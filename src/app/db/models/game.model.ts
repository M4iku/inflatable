export interface Game {
  id?: number; // autoincrementado
  name: string;
  minMinutes: number;
  minAmount: number;
  pricePerMinute: number;
  maxChildren: number;
}
