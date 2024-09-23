import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test: check if Card renders without crashing
test("renders Card without crashing", () => {
  render(<Card caption="Test caption" src="test.jpg" currNum={1} totalNum={3} />);
});

// Snapshot test: check if the component renders correctly
test("matches snapshot", () => {
  const { asFragment } = render(
    <Card caption="Test caption" src="test.jpg" currNum={1} totalNum={3} />
  );
  expect(asFragment()).toMatchSnapshot();
});
