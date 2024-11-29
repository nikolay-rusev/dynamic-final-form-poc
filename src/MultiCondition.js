// source: https://stackoverflow.com/questions/71298163/react-final-form-double-conditional-form
import { useFormState } from 'react-final-form';

const MultiCondition = ({ condition, children }) => {
  const { values = {} } = useFormState({ subscription: { values: true } });
  return condition(values) ? children : null;
};

export default MultiCondition;
