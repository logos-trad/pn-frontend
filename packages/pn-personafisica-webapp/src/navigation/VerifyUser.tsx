import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { exchangeToken } from '../redux/auth/actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { URL_FE_LOGIN } from '../utils/constants';

const VerifyUser = () => {
  const location = useLocation();
  const [spidToken, setSpidToken] = useState('');
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.userState.user.sessionToken);

  useEffect(() => {
    const params = new URLSearchParams(location.hash);
    const tokenParam = params.get('#token');
    if (tokenParam) {
      setSpidToken(tokenParam);
    } else {
      if (token === '') {
        /* eslint-disable functional/immutable-data */
       window.location.href = URL_FE_LOGIN || '';
      }
    }
  }, [location]);

  useEffect(() => {
    if (spidToken !== '') {
      void dispatch(exchangeToken(spidToken));
    }
  }, [spidToken]);

  return <></>;
};

export default VerifyUser;