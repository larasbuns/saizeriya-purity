
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

export function getQuizOutlets(): string[] {
    return correctOutlets.sort();
}
