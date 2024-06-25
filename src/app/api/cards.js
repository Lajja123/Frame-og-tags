// Example data structure for the cards
const cards = [
  { value: "2", suit: "hearts", points: [2] },
  { value: "3", suit: "hearts", points: [3] },
  { value: "4", suit: "hearts", points: [4] },
  { value: "5", suit: "hearts", points: [5] },
  { value: "6", suit: "hearts", points: [6] },
  { value: "7", suit: "hearts", points: [7] },
  { value: "8", suit: "hearts", points: [8] },
  { value: "9", suit: "hearts", points: [9] },
  { value: "10", suit: "hearts", points: [10] },
  { value: "J", suit: "hearts", points: [10] },
  { value: "Q", suit: "hearts", points: [10] },
  { value: "K", suit: "hearts", points: [10] },
  { value: "A", suit: "hearts", points: [1, 11] },
  // Repeat for all suits: diamonds, clubs, spades
  { value: "2", suit: "diamonds", points: [2] },
  { value: "3", suit: "diamonds", points: [3] },
  { value: "4", suit: "diamonds", points: [4] },
  { value: "5", suit: "diamonds", points: [5] },
  { value: "6", suit: "diamonds", points: [6] },
  { value: "7", suit: "diamonds", points: [7] },
  { value: "8", suit: "diamonds", points: [8] },
  { value: "9", suit: "diamonds", points: [9] },
  { value: "10", suit: "diamonds", points: [10] },
  { value: "J", suit: "diamonds", points: [10] },
  { value: "Q", suit: "diamonds", points: [10] },
  { value: "K", suit: "diamonds", points: [10] },
  { value: "A", suit: "diamonds", points: [1, 11] },
  // Continue for clubs and spades...
];

export default function handler(req, res) {
  res.status(200).json({ cards });
}
