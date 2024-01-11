import ResultBox from "./ResultBox";
import { cleanup, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe("Component ResultBox", () => {

  it("should render without crashing", () => {
    render(<ResultBox from="USD" to="PLN" amount={100} />);
  });

  const testCases =[
    {amount: 100, from: 'PLN', to: 'USD', result: 'PLN 100.00 = $28.57'},
    {amount: 200, from: 'PLN', to: 'USD', result: 'PLN 200.00 = $57.14'},
    {amount: 20, from: 'USD', to: 'PLN', result: '$20.00 = PLN 70.00'},
    {amount: 345, from: 'USD', to: 'PLN', result: '$345.00 = PLN 1,207.50'},
    {amount: 77, from: 'PLN', to: 'PLN', result: 'PLN 77.00 = PLN 77.00'},
    {amount: 220, from: 'USD', to: 'USD', result: '$220.00 = $220.00'},
  ];
  for(const testObj of testCases){
    it(`should render proper info about conversion when ${testObj.from} -> ${testObj.to}`, () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

      const textOutput = screen.getByTestId('text-output');
      expect(textOutput).toHaveTextContent(testObj.result);
    });
    cleanup();
  }
  const testCasesWrongValues =[
    {amount: -140, from: 'USD', to: 'PLN'},
    {amount: -84, from: 'PLN', to: 'USD'},
    {amount: -66, from: 'PLN', to: 'USD'},
    {amount: -35, from: 'PLN', to: 'USD'},
  ];

  for (const testObj of testCasesWrongValues) {
    it('should render proper info Wrong value...', () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const textOutput = screen.getByTestId('text-output');
      expect(textOutput).toHaveTextContent('Wrong value...');
    });
    cleanup();
  }
});