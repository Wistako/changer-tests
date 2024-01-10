import { cleanup, render, screen } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';


describe('CurrencyForm', () => {

  it('should render without craching', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  const testCases =[
    {amount: 100, from: 'PLN', to: 'USD'},
    {amount: 20, from: 'USD', to: 'PLN'},
    {amount: 200, from: 'PLN', to: 'USD'},
    {amount: 345, from: 'USD', to: 'PLN'},
  ];

  for(const testObj of testCases){
    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();
      
      // render component
      render(<CurrencyForm action={action} />);
      
      // find 'cconvert' button
      const submitButton = screen.getByText('Convert');
      
      // find field elements
      const amoutinput = screen.getByTestId('amount');
      const fromSelect = screen.getByTestId('from-select');
      const toSelect = screen.getByTestId('to-select');

      // set field elements
      userEvent.type(amoutinput, '100');
      userEvent.selectOptions(fromSelect, 'PLN');
      userEvent.selectOptions(toSelect, 'USD');

      // simulate user click on 'convert' button
      userEvent.click(submitButton);
      
      // check if action callback was called once
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: 100,
        from: 'PLN',
        to : 'USD',
      });
    });
    //  unamount component
    cleanup();
  }
});