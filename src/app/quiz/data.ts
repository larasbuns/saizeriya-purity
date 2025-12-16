export const correctOutlets = [
  'Ang Mo Kio Hub',
  'Bedok Point',
  'Bukit Timah Plaza',
  'Causeway Point',
  'Changi City Point',
  'Chinatown Point',
  'City Square Mall',
  'Clementi Mall',
  'Compass One',
  'Downtown East',
  'Eastpoint Mall',
  'HarbourFront Centre',
  'Hougang Mall',
  'Junction 8',
  'Jurong Point',
  'Lot One Shoppers\' Mall',
  'Marina Square',
  'NEX',
  'Northpoint City',
  'Oasis Terraces',
  'Orchard Gateway',
  'Rivervale Mall',
  'Sembawang Shopping Centre',
  'Sun Plaza',
  'Tampines 1',
  'The Seletar Mall',
  'Toa Payoh HDB Hub',
  'Waterway Point',
  'West Mall',
  'White Sands',
];

const decoys = [
  'ION Orchard',
  'Plaza Singapura',
  'VivoCity',
  'JEM',
  '313@Somerset',
  'Bugis Junction',
  'Funan Mall',
  'Raffles City',
  'Suntec City',
  'Marina Bay Sands',
];

// Function to shuffle an array
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function getQuizOutlets(): string[] {
    const allOptions = [...correctOutlets, ...decoys];
    return shuffle(allOptions);
}
