import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;
        const response = yield call(api.post, 'sessions', { email, password });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('Usuário não é prestador');
        }

        yield put(signInSuccess(token, user));
        history.push('/dashboard');
    } catch (erro) {
        toast.error('Usuário ou senha inválidos');
        yield put(signFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);