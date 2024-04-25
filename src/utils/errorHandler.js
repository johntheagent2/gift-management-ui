import errors from "../errors.json";

const errorHandler = (message) => {
  return errors[message];
};

export default errorHandler;
