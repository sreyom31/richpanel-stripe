import { IPlanDocument } from './plan.types';

export async function setLastUpdated(this: IPlanDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}