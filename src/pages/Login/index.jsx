import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'

import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Login = () => {

    const isAuth = useSelector( selectIsAuth )
    const dispatch = useDispatch()
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm( {
        defaultValues: {
            email: 'test123@gmail.com',
            password: '12345'
        },
        mode: 'onChange'
    } )

    const onSubmit = async ( values ) => {
        const data = await dispatch( fetchAuth( values ) )

        if ( !data.payload ) {
            alert( 'Failed to log in!' )
        }

        if ( 'token' in data.payload ) {
            window.localStorage.setItem( 'token', data.payload.token )
        }
    }

    useEffect( () => {

    }, [] )

    if ( isAuth ) {
        return <Navigate to={ '/' }/>
    }

    return (
        <Paper classes={ { root: styles.root } }>
            <Typography classes={ { root: styles.title } } variant="h5">
                Logging in to your account
            </Typography>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <TextField
                    className={ styles.field }
                    type="email"
                    label="E-Mail"
                    error={ !!errors.email?.message }
                    helperText={ errors.email?.message }
                    { ...register( 'email', { required: 'Specify your email' } ) }
                    fullWidth/>
                <TextField
                    className={ styles.field }
                    type="password"
                    label="Password"
                    error={ !!errors.password?.message }
                    helperText={ errors.password?.message }
                    { ...register( 'password', { required: 'Specify your password' } ) }
                    fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Login
                </Button>
            </form>
        </Paper>
    )
}
