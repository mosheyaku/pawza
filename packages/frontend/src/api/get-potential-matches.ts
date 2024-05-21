import { apiClient } from './base';

// TODO: Response interface

export const getPotentialMatches = () => apiClient.get('/potential-matches');
