import { MatchPasswordDirective } from "./match-password.directive";
import { CustomvalidationService } from "../../core/validations/password-validation";

describe("MatchPasswordDirective", () => {
  const customValidator: CustomvalidationService = new CustomvalidationService();
  it("should create an instance", () => {
    const directive = new MatchPasswordDirective(customValidator);
    expect(directive).toBeTruthy();
  });
});
