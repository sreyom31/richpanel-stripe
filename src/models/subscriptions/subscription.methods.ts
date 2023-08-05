import { ISubscriptionDocument } from './subscription.types';

export async function setLastUpdated(this: ISubscriptionDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}