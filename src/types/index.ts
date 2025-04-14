export interface Contact {
  id: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  contactId: string;
  amount: number;
  type: 'Given' | 'Received';
  date: string; 
  timestamp: string; 
  balance: number; 
}