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

export type payment = {
  user: string;
  eventId: string;
  invoiceId: string;
  payment_status: string;
  amount: number;
  currency: string;
};

export type paymentUpdate = {
  user?: string;
  eventId?: string;
  invoiceId?: string;
  payment_status?: string;
  amount?: number;
  currency?: string;
};

export type subscription = {
  user: string;
  paymentId: string;
  planId: string;
  active: string;
  subscriptionId: string;
};

export type subscriptionUpdate = {
  user?: string;
  paymentId?: string;
  planId?: string;
  active?: string;
  subscriptionId?: string;
};
