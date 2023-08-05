import { Document, Model, Types } from 'mongoose';

export interface IPayment {
  eventId: string;
  user: Types.ObjectId;
  invoiceId: string;
  payment_status: string;
  amount: number;
  currency: number;
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface IPaymentDocument extends IPayment, Document {
  setLastUpdated: (this: IPaymentDocument) => Promise<void>;
}

export interface IPaymentModel extends Model<IPaymentDocument> {
  paginate: (
    filter: any,
    options: any
  ) => {
    results: any;
    page: number;
    limit: number;
    totalPages: number;
    totalResults: any;
  };
}
