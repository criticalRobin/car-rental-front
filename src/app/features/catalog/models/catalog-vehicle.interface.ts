import { EngineType } from '../enums/engine-type.enum';
import { Transmission } from './transmission.enum';

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
  airConditioning?: boolean;
  doors?: number;
  engineType?: EngineType;
  transmission?: Transmission;
  passengers?: number;
  bags?: number;
  images: string[];
}
