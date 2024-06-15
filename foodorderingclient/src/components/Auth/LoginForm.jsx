import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Validate the field on change
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors({
          ...errors,
          [name]: '',
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.message,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        console.log('Form values:', values);
        // Submit the form or perform the login logic
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  return (
    <div>
      <Typography variant='h5' className='text-center'>Login</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Username or Email"
              fullWidth
              variant="outlined"
              value={values.username}
              onChange={handleChange}
              error={Boolean(errors.username)}
              helperText={errors.username}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button sx={{ marginTop: 2, padding: '1rem' }} fullWidth type='submit' variant='contained'>Login</Button>
      </form>
      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Don't have an account?
        <Button size='small' onClick={() => navigate('/account/register')}>Register</Button>
      </Typography>
    </div>
  );
}

export default LoginForm;
