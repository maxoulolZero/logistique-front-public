export interface CreateStockDto {
  name: string;
  quantity: number;
  prix: number;
}

export interface UpdateStockDto {
  name?: string;
  quantity?: number;
  prix?: number;
}