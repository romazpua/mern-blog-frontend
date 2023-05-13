import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';

export const Registration = () => {

    const isAuth = useSelector( selectIsAuth )
    const dispatch = useDispatch()
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm( {
        defaultValues: {
            fullName: 'John Smith',
            email: 'johnsmith123@gmail.com',
            password: '1234'
        },
        mode: 'onChange'
    } )

    const onSubmit = async ( values ) => {
        const data = await dispatch( fetchRegister( values ) )

        console.log( data )

        if ( !data.payload ) {
            alert( 'Failed to Sign up!' )
        }

        if ( 'token' in data.payload ) {
            window.localStorage.setItem( 'token', data.payload.token )
        }
    }

    return (
        <Paper classes={ { root: styles.root } }>
            <Typography classes={ { root: styles.title } } variant="h5">
                Creating an account
            </Typography>
            <div className={ styles.avatar }>
                <Avatar sx={ { width: 100, height: 100 } }/>
            </div>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <TextField
                    error={ !!errors.fullName?.message }
                    helperText={ errors.fullName?.message }
                    type="text"
                    { ...register( 'fullName', { required: 'Specify your Full Name' } ) }
                    className={ styles.field }
                    label="Full Name" fullWidth/>
                <TextField
                    error={ !!errors.email?.message }
                    helperText={ errors.email?.message }
                    type="email"
                    { ...register( 'email', { required: 'Specify your email' } ) }
                    className={ styles.field }
                    label="E-Mail" fullWidth/>
                <TextField
                    error={ !!errors.password?.message }
                    helperText={ errors.password?.message }
                    type="password"
                    { ...register( 'password', { required: 'Specify your password' } ) }
                    className={ styles.field }
                    label="Password" fullWidth/>
                <Button type="submit"
                        disabled={ !isValid }
                        size="large"
                        variant="contained"
                        fullWidth>
                    Sign up
                </Button>
            </form>
        </Paper>
    );
};
