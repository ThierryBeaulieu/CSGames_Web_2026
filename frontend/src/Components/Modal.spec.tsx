import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
  test("renders when isOpen is true", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    // Check that the modal title is in the document
    expect(screen.getByText("Test Modal")).toBeDefined();

    // Check that children are rendered
    expect(screen.getByText("Modal Content")).toBeDefined();

    // Simulate clicking the backdrop to close
    fireEvent.click(screen.getByText("✕"));
    expect(handleClose).toHaveBeenCalled();
  });

  test("does not render when isOpen is false", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={false} onClose={handleClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).toBeNull();
    expect(screen.queryByText("Modal Content")).toBeNull();
  });
});
