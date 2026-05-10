export interface GetAllCargoResponse {
  status: string;
  code: number;
  description: string;
  data: GetAllCargoData;
}

export interface GetAllCargoData {
  items: GetAllCargoItem[];
  total: number;
}

export interface GetAllCargoItem {
  adr_class?: number;
  adr_enabled: boolean;
  belts_count?: number;
  cargo_type?: CargoType;
  comment?: string;
  compnumber_id?: number;
  contact_name: string;
  contact_phone: string;
  created_at: string;
  created_by_id: string;
  created_by_type: string;
  dimensions?: string;
  documents?: Documents;
  id: string;
  is_liked: boolean;
  is_two_drivers_required: boolean;
  loading_types: string[];
  moderation_rejection_reason?: number;
  name: string;
  packaging?: string;
  packaging_amount?: number;
  payment: Payment;
  photos: string[];
  power_plate_type: string;
  route_points: RoutePoint[];
  shipment_type: string;
  status: string;
  temp_max?: number;
  temp_min?: number;
  trailer_plate_type: string;
  truck_type: string;
  unloading_types: string[];
  updated_at: string;
  vehicles_amount: number;
  vehicles_left: number;
  volume: number;
  way_points?: number[];
  weight: number;
}

export interface CargoType {
  code: string;
  id: string;
  name_en: string;
  name_ru: string;
  name_tr: string;
  name_uz: string;
  name_zh: string;
}

export interface Documents {
  TIR: boolean;
  CMR: boolean;
  Seal: boolean;
}

export interface Payment {
  cargo_id: string;
  id: string;
  is_negotiable: boolean;
  payment_note: number;
  payment_terms_note: number;
  prepayment_amount?: number;
  prepayment_currency: string;
  prepayment_type: string;
  price_request: boolean;
  remaining_amount?: number;
  remaining_currency: string;
  remaining_type: string;
  total_amount: number;
  total_currency: string;
  with_prepayment: boolean;
}

export interface RoutePoint {
  address: string;
  cargo_id: string;
  city_code: string;
  city_name: string;
  comment?: string;
  country_code: string;
  date: string;
  delivery_asap: boolean;
  id: string;
  is_main_load: boolean;
  is_main_unload: boolean;
  lat: number;
  lng: number;
  orientir: string;
  place_id: string;
  point_order: number;
  ready_enabled: boolean;
  region_code: string;
  type: string;
}

export interface getCargoParams {
  page?: number;
  limit?: number;
  sort?: SortValue;
  status?: string;
}

export type SortValue = "created_at:desc" | "created_at:asc";
