import { useFormState } from 'react-final-form';

const MultiCondition = ({ condition, children }) => {
  const { values = {} } = useFormState({ subscription: { values: true } });
  return condition(values) ? children : null;
};

export default MultiCondition;
