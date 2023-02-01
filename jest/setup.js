jest.mock("../src/stores/mfaStore", () =>
  jest.fn().mockImplementation(() => ({
    mfas: [
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
      {
        provider: "Test Provider 3",
        code: "567890",
        image: "www.testurl.com",
        exp: new Date(2023, 2, 3),
      },
      {
        provider: "Test Provider 4",
        code: "098765",
        image: "www.testurl.com",
        exp: new Date(2023, 2, 3),
      },
    ],
    start: jest.fn(),
    createMFA: jest.fn(),
    switchMFAs: jest.fn(),
  }))
);

jest.useFakeTimers().setSystemTime(new Date(2023, 2, 1));
