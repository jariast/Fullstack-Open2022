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

export { parseError };
