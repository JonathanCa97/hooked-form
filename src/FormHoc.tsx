import * as React from 'react';
import Form, { FormOptions } from './Form';
import { EMPTY_ARRAY } from './helpers/useState';
import { InitialValues } from './types';
import { useContextEmitter } from './useContextEmitter';

type FormHocOptions<T> = FormOptions<T> & { mapPropsToValues?: (props: object) => InitialValues };

const OptionsContainer = <Values extends object>({
  enableReinitialize,
  initialValues: formInitialValues,
  mapPropsToValues,
  ...rest
}: FormHocOptions<Values>) => {
  let initialValues = formInitialValues;

  if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line: no-console
    console.warn('The Higher-order component has been deprecated. use <HookedForm> instead.');
  }

  return function FormOuterWrapper(Component: React.ComponentType<any> | React.FC<any>) {
    const NewComponent = (props: any) => {
      const ctx = useContextEmitter(['formError', 'isSubmitting', 'isDirty']);
      return (
        <Component
          change={ctx.setFieldValue}
          formError={ctx.formError}
          handleSubmit={ctx.submit}
          isSubmitting={ctx.isSubmitting}
          resetForm={ctx.resetForm}
          isDirty={ctx.isDirty}
          {...props}
        />
      );
    };

    return function FormWrapper(props: { [property: string]: any }) {
      const passDownProps = React.useMemo(() => (
        enableReinitialize ? Object.values(props) : EMPTY_ARRAY
      ), [enableReinitialize && props]);

      // Make our listener for the reinitialization when need be.
      React.useEffect(() => {
        if (enableReinitialize && mapPropsToValues) initialValues = mapPropsToValues(props);
      }, [...passDownProps]);

      return (
        <Form<Values>
          {...rest}
          enableReinitialize={enableReinitialize}
          initialValues={mapPropsToValues && !initialValues ?
            (initialValues = mapPropsToValues(props)) : initialValues}
          noForm={true}
        >
          <NewComponent {...props} />
        </Form>
      );
    };
  };
};

export default OptionsContainer;
