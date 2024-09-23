import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js"; // Assuming this has test images like image1, image2, etc.

// Sample data for the tests
const photos = [
  { src: "image1.jpg", caption: "First photo" },
  { src: "image2.jpg", caption: "Second photo" },
  { src: "image3.jpg", caption: "Third photo" },
];

// Smoke test: check if Carousel renders without crashing
test("renders Carousel without crashing", () => {
  render(<Carousel photos={photos} title="Test Carousel" />);
});

// Snapshot test: check if the component renders correctly
test("matches snapshot", () => {
  const { asFragment } = render(<Carousel photos={photos} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});

// Functionality test: check if clicking the right arrow changes the photo
test("navigates forward when right arrow is clicked", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Check that the first image is displayed
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

  // Simulate clicking the right arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to show
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
});

// Test: left arrow is hidden on the first image and right arrow is hidden on the last image
test("hides left arrow on first image and right arrow on last image", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Check that the left arrow is not rendered on the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(leftArrow).not.toBeInTheDocument();  // First image: no left arrow
  expect(rightArrow).toBeInTheDocument();     // First image: right arrow is visible

  // Simulate moving to the last image
  fireEvent.click(rightArrow); // Move to second image
  fireEvent.click(rightArrow); // Move to last image

  // Check that the right arrow is not rendered on the last image
  expect(container.querySelector(".bi-arrow-right-circle")).not.toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-left-circle")).toBeInTheDocument(); // Left arrow is visible
});

// Functionality test: check if clicking the left arrow navigates backward
test("navigates backward when left arrow is clicked", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Simulate clicking the right arrow to go to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to be displayed
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();

  // Simulate clicking the left arrow to go back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to be displayed again
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
});
