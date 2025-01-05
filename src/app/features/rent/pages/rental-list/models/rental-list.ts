export interface IRentalList {
  rentalId: number;
  clientIdNumber: string;
  vehicleBrand: string;
  vehicleModel: string;
  rentalDate: string;
  returnDate: string;
  rentalDuration: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  quantityOfDuration: number;
  totalAmount: number;
  status: 'RESERVED' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}
