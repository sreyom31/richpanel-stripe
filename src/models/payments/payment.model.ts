import { model } from 'mongoose';
import { IPaymentDocument, IPaymentModel } from './payment.types';
import PaymentSchema from './payment.schema';

const PaymentModel = model<IPaymentDocument, IPaymentModel>(
  'payment',
  PaymentSchema
);
export default PaymentModel;
