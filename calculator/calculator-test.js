beforeAll( () => {
  values = {
    amount: 10000,
    years: 10,
    rate: .06,
  }
})

describe('calculateMonthlyPayment tests', () => {
  it('should calculate the monthly rate correctly', () => {
    expect(calculateMonthlyPayment(values)).toEqual('111.02');
  });

  it("should return a result with 2 decimal places", () => {
    expect(calculateMonthlyPayment(values).at(-3)).toBe('.');
    expect(calculateMonthlyPayment(values).slice(-2).length).toEqual(2);
  });
})






