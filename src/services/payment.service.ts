import httpStatus from 'http-status';
import { Payment, PaymentUpdate } from '../shared/customTypes';
import PaymentModel from '../models/payments/payment.model';
import ApiError from '../utils/ApiError';

const createPayment = async (paymentBody: Payment) => {
  return PaymentModel.create(paymentBody);
};

const getPaymentById = async (id: string) => PaymentModel.findById(id);

const queryPayments = async (filter: any, options: any) => {
  const payments = await PaymentModel.paginate(filter, options);
  return payments;
};
const updatePaymentById = async (
  paymentId: string,
  updateBody: PaymentUpdate
) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  Object.assign(payment, updateBody);
  await payment.save();
  return payment;
};

const deletePaymentById = async (paymentId: string) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await payment.remove();
  return payment;
};

export default {
  createPayment,
  updatePaymentById,
  queryPayments,
  deletePaymentById,
  getPaymentById,
};
