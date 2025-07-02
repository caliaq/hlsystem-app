export interface Visitor {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVisitorDto {
  name: string;
  email: string;
  phone?: string;
}
