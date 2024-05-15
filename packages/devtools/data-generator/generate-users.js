const USERS_TO_GENERATE = 50;

const fs = require('fs');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

const UserPurpose = ['platonic', 'romantic', 'all'];
const Genders = ['man', 'woman', 'other'];

const generateRandomUser = () => {
  const gender = Genders[Math.floor(Math.random() * Genders.length)];
  const purpose = UserPurpose[Math.floor(Math.random() * UserPurpose.length)];

  const firstName = uniqueNamesGenerator({ dictionaries: [names] });
  const lastName = uniqueNamesGenerator({ dictionaries: [names] });
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  // Generate a random birth date between 18 and 50 years ago
  const currentDate = new Date();
  const minAge = 18;
  const maxAge = 50;
  const birthDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - minAge) -
      Math.floor(Math.random() * ((maxAge - minAge) * 365 * 24 * 60 * 60 * 1000))
  ).toISOString();

  const coordinates = [
    (Math.random() * 360 - 180).toFixed(6), // Longitude between -180 and 180
    (Math.random() * 180 - 90).toFixed(6), // Latitude between -90 and 90
  ];

  const photos = Array.from(
    { length: Math.floor(Math.random() * 5 + 1) },
    (_, index) => `https://example.com/photos/${firstName}${lastName}${index + 1}.jpg`
  );

  return {
    email,
    firstName,
    lastName,
    password: 'hashedpassword123', // Placeholder for the hashed password
    birthDate,
    gender,
    purpose,
    location: {
      type: 'Point',
      coordinates: coordinates.map(Number),
    },
    photos,
  };
};

const generateUsers = count => {
  return Array.from({ length: count }, generateRandomUser);
};

const users = generateUsers(USERS_TO_GENERATE);

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

console.log(`${USERS_TO_GENERATE} user documents have been generated and saved to users.json`);
