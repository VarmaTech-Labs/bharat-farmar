const error = (statusCode: number, message: string): Error => {
  const err:any = new Error();
  err.message = message;
  err.statusCode = statusCode;
  return err;
};

export default error