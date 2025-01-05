export interface Vehicle {
    vehicleId: number;
    brand: string;              // Marca del vehículo
    model: string;              // Modelo del vehículo
    licensePlate: string;       // Placa del vehículo
    typeId: number;             // Tipo ID del vehículo
    status: string;             // Estado del vehículo (e.g., "AVAILABLE")
    acquisitionDate: string;    // Fecha de adquisición (formato ISO 8601)
    mileage: number;            // Kilometraje del vehículo
    location: string;           // Ubicación del vehículo
    airConditioning: boolean;   // Indica si tiene aire acondicionado
    numberOfDoors: number;      // Número de puertas
    fuelType: string;           // Tipo de combustible (e.g., "GASOLINE")
    transmissionType: string;   // Tipo de transmisión (e.g., "MANUAL")
    images?: Image[];           // Lista de imágenes (opcional)
  }
  export interface Image {
    imageId: number;            // ID único de la imagen
    imageUrl: string;           // URL de la imagen
  }
  