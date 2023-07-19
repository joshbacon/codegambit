import '../styles/Login.css';
import { useState } from 'react';
import pb from '../api/pocketbase';
import { useForm } from 'react-hook-form';
import Loader from '../components/Loader';
import useLogin from '../hooks/useLogin';

const Login = ({onLogin}) => {
    const login = useLogin();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    let onSubmit = async (data) => {
        setLoading(true);
        login(data).then(() => {
            if (pb.authStore.isValid) {
                onLogin(true);
                reset();
            };
        });
        setLoading(false);
    }

    return <div className='login-card'>
        <h1>Welcome to code_gambit</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='username'
                {...register('username')}
            />
            <input
                type='password'
                placeholder='password'
                {...register('password')}
            />

            <button type='submit'>Login</button>
        </form>
        { loading && <Loader /> }
    </div>
}

export default Login;