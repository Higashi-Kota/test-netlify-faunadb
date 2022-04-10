import { toast } from 'react-toastify';

const notify = ({ message = 'Wow so easy!' }) => {
  return toast(message);
};

export { notify };
