import { describe, it } from "@jest/globals";
import { HttpResponse } from "../HttpResponse";

describe("# HttpResponse Suite", () => {
  it("should return a success response", () => {
    // Arrange
    const data = { name: "John Doe" };
    // Act

    const response = new HttpResponse(null, data);
    // Assert

    expect(response.success()).toEqual({
      success: true,
      data,
    });
  });

  it("should return an error response", () => {
    // Arrange
    const error = "Error message";
    const errors = ["Error 1", "Error 2"];
    // Act

    const response = new HttpResponse(error, null, errors);
    // Assert

    expect(response.error()).toEqual({
      success: false,
      errors,
    });
  });
});
