export type ResponseType = {
  data: CarType[];
  meta: MetaType;
};

export type MetaType = {
  limit: number;
  page: number;
  total_no_filters: number;
  count: number;
  total: number;
  last_page: number;
  first_page_link: string;
  next_page_link: string;
  last_page_link: string;
  from: number;
  to: number;
};

export type ImagesType = {
  image: string[];
};

export type RelationType = {
  slug: string;
  count: number;
  name: string;
};

export type Currency = 'RUR' | 'USD' | 'EUR';

export type CarType = {
  mark_id: string;
  folder_id: string;
  modification_id: string;
  complectation_name: string;
  body_type: string;
  wheel: string;
  color: string;
  metallic: string;
  availability: string;
  custom: string;
  state: string;
  owners_number: string;
  run: number;
  year: number;
  registry_year: number;
  currency: Currency;
  vin: string;
  price: number;
  extras: string;
  images: ImagesType;
  video: string;
  booking_allowed: boolean;
  pts: string;
  unique_id: number;
  exchange: string;
  tech_param_id: number;
  engine_volume: number;
  engine_power: string;
  engine_type: string;
  gearbox: string;
  drive: string;
  model_name: string;
  generation_name: string;
  mark_cyrillic_name: string;
  model_cyrillic_name: string;
  offer_type: string;
  updated_at: string;
  generation_rel: RelationType;
  brand_rel: RelationType;
  model_rel: RelationType;
  images_amount: number;
  engine_type_eng: string;
  engine_power_num: number;
  body_type_eng: string;
  owners_number_num: 1;
  color_eng: string;
  gearbox_eng: string;
};
