import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { paymentService } from '../services';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});

const getPayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.getPaymentById(req.params.paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'payment not found');
  }
  res.send(payment);
});

const getPayments = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'user',
    'eventId',
    'invoiceId',
    'payment_status',
    'amount',
    'currency',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await paymentService.queryPayments(filter, options);
  res.send(result);
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.updatePaymentById(
    req.params.paymentId,
    req.body
  );
  res.send(payment);
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  await paymentService.deletePaymentById(req.params.paymentId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createPayment,
  getPayment,
  getPayments,
  updatePayment,
  deletePayment,
};
