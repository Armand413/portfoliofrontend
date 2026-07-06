export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}