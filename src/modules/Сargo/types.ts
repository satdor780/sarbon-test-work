export interface CargoLeg {
  countryCode: string;
  city: string;
  date: string;
}

export interface Cargo {
  id: string;
  from: CargoLeg;
  to: CargoLeg;
  price: string;
  paymentType: string;
  weightTon: number;
  volumeM3: number;
  cargoType: string;
  shipmentType?: string;
  transport: string;
  loadingTypes?: string[];
  buyer: string;
  buyerPhone: string;
  buyerInitials: string;
  buyerColor: string;
  isFavorite?: boolean;
}
