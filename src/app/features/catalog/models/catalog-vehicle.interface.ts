export interface ICatalogVehicle {
  vehicleId: number;
  brand: string;
  model: string;
  licensePlate: string;
  status: string;
  active: boolean;
  acquisitionDate: string;
  mileage: number;
  location: string;
  type: string;
  dailyRate: number;
  images: IImage[];
  airConditioning: boolean;
  numberOfDoors: number;
  fuelType: string;
  transmissionType: string;
}

interface IImage {
  imageId: number;
  imageUrl: string;
}
