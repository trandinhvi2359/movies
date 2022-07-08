import { AuthenticationError, ApolloError } from 'apollo-server-express';

import constant from './constant';

const formatErrorResponse = (error) => {
  if (error.extensions && error.extensions.code) {
    const errorResponse = {
      status: constant.statusCode.errorServer,
      message: error.message,
      code: error.extensions.code,
    };
    if (
      error.originalError instanceof AuthenticationError ||
      error.extensions.code === 'UNAUTHENTICATED' ||
      (error.extensions.exception &&
        error.extensions.exception.status === constant.statusCode.unauthenticated)
    ) {
      errorResponse.status = constant.statusCode.unauthenticated;
    } else if (error.originalError instanceof ApolloError) {
      errorResponse.message = error.message.replace('Error: ', '');
      errorResponse.status =
        error.extensions.code === 'BAD_USER_INPUT'
          ? constant.statusCode.unprocessableEntity
          : constant.statusCode.errorServer;
    }
    return errorResponse;
  }
  return { status: constant.statusCode.errorServer, message: error.details, code: error.code };
};

export default formatErrorResponse;
