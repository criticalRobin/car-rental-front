export interface IPayment {
  rentalId: number;
  amount: number;
  successUrl: string;
  cancelUrl: string;
  typePayment: string;
}

export interface IPaymentResponse {
  sessionId: string;
  url: string;
}
