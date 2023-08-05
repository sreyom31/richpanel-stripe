import { IPaymentDocument } from './payment.types';

export async function setLastUpdated(this: IPaymentDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}