import { act, renderHook } from "@testing-library/react";

import { useInputValidate } from "../hooks/useInputValidate";

describe("useInputValidate", () => {
  it("should initialize with empty value and no error", () => {
    const { result } = renderHook(() => useInputValidate());

    expect(result.current.value).toBe("");
    expect(result.current.error).toBe("");
  });

  it("should not set an error when the value is non-empty", () => {
    const { result } = renderHook(() => useInputValidate());
    const mockEvent = {
      target: { value: "Some value" },
    };

    act(() => {
      result.current.onChange(mockEvent as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.validate();
    });

    expect(result.current.error).toBe("");
  });

  it("should set an error for empty input", () => {
    const { result } = renderHook(() => useInputValidate());
    const mockEvent = {
      target: { value: "" },
    };

    act(() => {
      result.current.onChange(mockEvent as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.validate();
    });

    expect(result.current.error).toBe("This field is required");
  });
});
