import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';

import { ErrorMessage, Form } from '../../src';

const ErrorDisplay = ({ error }: { error: string }) => {
  return <p data-testid="error">{error}</p>;
}

const Component = () => <ErrorMessage fieldId="name" component={ErrorDisplay} />;

const makeForm = (formOptions?: object, props?: object) => {
  let injectedProps: any;
  const TestForm = Form({
    onSubmit: () => null,
    ...formOptions,
  })((formProps: any) => (injectedProps = formProps) && <Component {...formProps} />);
  return {
    getProps: () => injectedProps,
    ...render(<TestForm {...props} />),
  };
};

describe('ErorrMessage', () => {
  afterEach(() => {
    cleanup();
  });

  describe('functionality', () => {
    it('should render the correct error', () => {
      const { getProps, getByTestId } =
        makeForm({ validate: () => ({ name: 'bad' }), validateOnChange: true });
      const { change } = getProps();
      act(() => {
        change('name', 'jovi');
      });
      const errorPTag = getByTestId('error');
      expect(errorPTag.textContent).toEqual('bad');
    });

    it('should throw without a component', () => {
      // @ts-ignore
      const Error = () => <ErrorMessage fieldId="name" />;

      const makeErroneousForm = (formOptions?: object, props?: object) => {
        let injectedProps: any;
        const TestForm = Form({
          onSubmit: () => null,
          ...formOptions,
        })((formProps: any) => (injectedProps = formProps) && <Error {...formProps} />);
        return {
          getProps: () => injectedProps,
          // @ts-ignore
          ...render(<TestForm {...props} />),
        };
      };

      expect(() => makeErroneousForm()).toThrowError(/The ErrorMessage needs a "component" property to  function correctly/);
    });
  });
});
