import React from 'react'
import MFAStore from '../mfaStore'

describe('MFAStore', () => {
  let mockStore: MFAStore

  beforeEach(() => {
    mockStore = new MFAStore()
  })

  it('should start with 4 mfas', () => {
    mockStore.start()
    expect(mockStore.mfas.length).toBe(4)
  })

  it('should update mfas when create new mfa', () => {
    mockStore.createMFA('Google')
    expect(mockStore.mfas.length).toBe(1)
  })

  it('should update mfas when switch 2 mfas', () => {
    mockStore.start()
    mockStore.createMFA('Google')
    const first = 1
    const second = 2
    const firstMFA = mockStore.mfas[first]
    const sedondMFA = mockStore.mfas[second]
    mockStore.switchMFAs(first, second)
    expect(mockStore.mfas[first]).toBe(sedondMFA)
    expect(mockStore.mfas[second]).toBe(firstMFA)
  })
})
