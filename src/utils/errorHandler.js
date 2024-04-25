import errors from '../errors';

const errorHandler = (message) => {
  return errors[message];
};

export default errorHandler;
