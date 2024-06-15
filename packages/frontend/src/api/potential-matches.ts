import { apiClient } from './base';

// TODO: Response interface

export interface PotentialMatchDto {
  id: string;
  firstName: string;
  age: number;
  gender: string;
  photo: string;
}

export const getPotentialMatch = (userIdsToIgnore: string[]) =>
  apiClient.get<PotentialMatchDto[]>('/potential-matches', { params: { userIdsToIgnore } }).then((res) => res.data);

export const decidePotentialMatch = (params: { suggestedUserId: string; decision: 'accept' | 'decline' }) =>
  apiClient.post(`/potential-matches/${params.suggestedUserId}/${params.decision}`);
