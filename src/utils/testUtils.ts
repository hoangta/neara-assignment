import { MFA } from "../types/mfa";

export const mockSVGElementAnimate = () => {
  const circleAnimateSpy = jest.fn();
  SVGElement.prototype.animate = circleAnimateSpy;
  return circleAnimateSpy;
};

export const mockMFAs: MFA[] = [
  {
    provider: "Test Provider",
    code: "012345",
    image: "www.testurl.com",
    exp: new Date(2023, 2, 2),
  },
  {
    provider: "Test Provider 2",
    code: "543210",
    image: "www.testurl.com",
    exp: new Date(2023, 2, 3),
  },
];
