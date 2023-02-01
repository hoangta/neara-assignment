import React from "react";
import MFAStore from "../mfaStore";

jest.mock("../mfaStore", () => jest.requireActual("../mfaStore"));

describe("MFAStore", () => {
  let mockStore: MFAStore;

  beforeEach(() => {
    mockStore = new MFAStore();
    jest.useFakeTimers();
  });

  it("should start with 4 mfas", () => {
    mockStore.start();
    jest.runOnlyPendingTimers();
    expect(mockStore.mfas.length).toBe(4);
  });

  it("should update mfas when create new mfa", () => {
    mockStore.createMFA("Google");
    expect(mockStore.mfas.length).toBe(1);
  });

  it("should update mfas when switch 2 mfas", () => {
    mockStore.start();
    mockStore.createMFA("Google");
    const first = 1;
    const second = 2;
    const firstMFA = mockStore.mfas[first];
    const sedondMFA = mockStore.mfas[second];
    mockStore.switchMFAs(first, second);
    expect(mockStore.mfas[first]).toBe(sedondMFA);
    expect(mockStore.mfas[second]).toBe(firstMFA);
  });

  it("should not update mfas when switch 2 invalid indexes", () => {
    mockStore.start();
    mockStore.createMFA("Google");
    const originMFAs = [...mockStore.mfas];
    mockStore.switchMFAs(0, 0);
    expect(mockStore.mfas).toEqual(originMFAs);
    mockStore.switchMFAs(0, -1);
    expect(mockStore.mfas).toEqual(originMFAs);
    mockStore.switchMFAs(-1, 0);
    expect(mockStore.mfas).toEqual(originMFAs);
    mockStore.switchMFAs(10, 2);
    expect(mockStore.mfas).toEqual(originMFAs);
    mockStore.switchMFAs(2, 10);
    expect(mockStore.mfas).toEqual(originMFAs);
  });
});
