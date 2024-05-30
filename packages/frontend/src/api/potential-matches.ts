import { apiClient } from './base';

// TODO: Response interface

export const getPotentialMatches = () => apiClient.get('/potential-matches');

export const decidePotentialMatch = (params: { suggestedUserId: string; decision: 'accept' | 'decline' }) =>
  apiClient.post(`/potential-matches/${params.suggestedUserId}/${params.decision}`);
