import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import axios from 'axios';

function parseError(e: unknown) {
  if (axios.isAxiosError(e)) {
    if (e?.response?.data && typeof e?.response?.data === 'string') {
      const message = e.response.data.replace(
        'Something went wrong. Error: ',
        ''
      );
      console.error(message);
      return message;
    } else {
      return 'Unrecognized axios error';
    }
  } else {
    console.error('Unknown error', e);
    return 'Unknown error';
  }
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).message === 'string'
  );
}

function parseRTKQueryError(error: unknown) {
  //This check is used when the backend actually returns an Error message
  if (typeof error === 'object' && error !== null && 'data' in error) {
    return JSON.stringify(error.data);
  } else if (isFetchBaseQueryError(error)) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return errMsg;
  } else if (isErrorWithMessage(error)) {
    return error.message;
  }
}

/**
 * Function to split strings by Uppercase words.
 * @param {string} string - String to split e.g. 'TestString'
 * @returns {string} Split stream e.g 'Test String'
 */
function splitStringByUpperCase(string: string): string {
  return string.split(/(?=[A-Z])/).join(' ');
}

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

export {
  parseError,
  isFetchBaseQueryError,
  isErrorWithMessage,
  parseRTKQueryError,
  splitStringByUpperCase,
  assertNever,
};
