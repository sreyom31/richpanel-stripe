export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserUpdate = {
  name?: string;
  email?: string;
  password?: string;
};

export type Plan = {
  name: string;
  monthly: number;
  price: number;
  videoQuality: string;
  resolution: string;
  screens: number;
  devices: string[];
};

export type PlanUpdate = {
  name?: string;
  monthly?: number;
  price?: number;
  videoQuality?: string;
  resolution?: string;
  screens?: number;
};
