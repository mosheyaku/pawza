import { apiClient } from './base';

export interface PotentialMatchDto {
  id: string;
  firstName: string;
  age: number;
  gender: string;
  photo: string;
}

export const getPotentialMatch = (userIdsToIgnore: string[]) =>
  apiClient.get<PotentialMatchDto[]>('/potential-matches', { params: { userIdsToIgnore } }).then((res) => res.data);

export const decidePotentialMatch = (params: { suggestedUserId: string; decision: 'accept' | 'decline' | 'super' }) =>
  apiClient.post(`/potential-matches/${params.suggestedUserId}/${params.decision}`);
