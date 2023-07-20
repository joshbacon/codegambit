import '../styles/AuthCard.css';
import { useState } from 'react';
import pb from '../api/pocketbase';
import { useForm } from 'react-hook-form';
import Loader from './Loader';
import useLogin from '../hooks/useLogin';
import useSignup from '../hooks/useSignup';

const AuthCard = ({onLogin}) => {
    const login = useLogin();
    const signup = useSignup();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState(false);

    let handleLogin = async (data) => {
        setLoading(true);
        login(data).then(() => {
            if (pb.authStore.isValid) {
                onLogin(true);
                reset();
            };
        });
        setLoading(false);
    }

    let handleSignup = async (data) => {
        setLoading(true);
        signup(data).then(() => {
            if (pb.authStore.isValid) {
                onLogin(true);
                reset();
            };
        });
        setLoading(false);
    }

    return <div className='auth-card'>
        <h1>Welcome to code_gambit</h1>
        { newUser ?
            <form className={'signup-form fade-in'} onSubmit={handleSubmit(handleSignup)}>
                <input
                    type='text'
                    placeholder='email'
                    {...register('email')}
                />
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

                <button type='submit'>Signup</button>
            </form> :
            <>
                <form className={'login-form fade-in'} onSubmit={handleSubmit(handleLogin)}>
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
                    <a href='#'>Forgot your password?</a>
                </form>
            </>
        }
        <button
            className='toggleMethod'
            onClick={() => setNewUser(!newUser)}
        >
            {newUser ? 'Login' : 'Sign Up'}
        </button>
        { loading && <Loader /> }
    </div>
}

export default AuthCard;