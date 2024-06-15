import { apiClient } from './base';

// TODO: Response interface

export const getPotentialMatches = () => apiClient.get('/potential-matches');

export const decidePotentialMatch = (params: { suggestedUserId: string; decision: 'accept' | 'decline' }) =>
  apiClient.post(`/potential-matches/${params.suggestedUserId}/${params.decision}`);

// export function getPotentialMatches(): any {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const potentialMatches: potentialMatch[] = [];
//       for (let i = 0; i < 5; i++) {
//         potentialMatches.push({
//           id: `the id is : ${i}`,
//           firstName: `zona number ${i}`,
//           age: i,
//           gender: 'shemale',
//           photo: db[i].image,
//         });
//       }
//       resolve({ data: potentialMatches });
//     }, 500);
//   });
// }

// const db = [
//   {
//     image:
//       'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/bernese-mountain-dog.jpg?crop=1.00xw:0.668xh;0,0.252xh&resize=640:*',
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   },
//   {
//     image: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     image: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     image: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
// ];

// interface potentialMatch {
//   id: string;
//   firstName: string;
//   age: number;
//   gender: string;
//   photo: string;
// }
