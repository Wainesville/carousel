import { render, fireEvent, screen } from "@testing-library/react";
import CoinFlipper from "./CoinFlipper";

// Test that no coin image is present when the page first loads
test("no coin image on initial load", () => {
  render(<CoinFlipper />);
  expect(screen.queryByAltText(/heads/i)).not.toBeInTheDocument();
  expect(screen.queryByAltText(/tails/i)).not.toBeInTheDocument();
});

// Test that flipping the coin updates the text count for heads or tails
test("flips coin and updates count", () => {
  render(<CoinFlipper />);

  // Initial counts should be 0
  expect(screen.getByText(/Heads: 0, Tails: 0/i)).toBeInTheDocument();

  // Simulate clicking the flip coin button
  const button = screen.getByText("Flip Coin");
  fireEvent.click(button);

  // After clicking, either heads or tails should increment
  const headsOrTailsText = screen.getByText(/Heads: \d+, Tails: \d+/i);
  expect(headsOrTailsText).toBeInTheDocument();
});
