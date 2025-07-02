export interface Gate {
  _id: string;
  name: string;
  description: string;
  isOpen: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGateDto {
  name: string;
  description: string;
  isOpen?: boolean;
}
