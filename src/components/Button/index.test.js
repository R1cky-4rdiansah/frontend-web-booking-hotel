import React from "react";
import { render } from "@testing-library/react";
import Button from ".";

test("Test komponen button disabled", () => {
      const{ container } = render(<Button isDisabled></Button>)

      expect(container.querySelector('span.disabled')).toBeInTheDocument();
});

test("Test komponen button loading", () => {
  const { container, getByText } = render(<Button isLoading></Button>);

  expect(container.querySelector("span")).toBeInTheDocument();
  expect(getByText(/loading/i)).toBeInTheDocument();
});

test("Test komponen href link", () => {
      const { container } = render(<Button type="link" isExternal ></Button>)

      expect(container.querySelector("a")).toBeInTheDocument();
});