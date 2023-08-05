import { Document, Model, Types } from 'mongoose';

export interface ISubscription {
  paymentId: string;
  user: Types.ObjectId;
  planId: string;
  active: string;
  subscriptionId: string;
  validTill: Date;
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface ISubscriptionDocument extends ISubscription, Document {
  setLastUpdated: (this: ISubscriptionDocument) => Promise<void>;
}

export interface ISubscriptionModel extends Model<ISubscriptionDocument> {
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
