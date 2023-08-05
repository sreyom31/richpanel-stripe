import { Document, Model } from 'mongoose';

export interface IPlan {
  name: string;
  monthly: number;
  price: number;
  priceId: string;
  videoQuality: string;
  resolution: string;
  screens: number;
  devices: string[];
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface IPlanDocument extends IPlan, Document {
  setLastUpdated: (this: IPlanDocument) => Promise<void>;
}

export interface IUserModel extends Model<IPlanDocument> {
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
