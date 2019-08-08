import React, { useState, useEffect } from 'react';
import { Form as FormikForm, Field, withFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import UserList from './UserList';

function Form ({ errors, touched, values, handleSubmit, status }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status])

  return (
    <div>
    <div className="form">
      <h1 style={{marginBottom: '0', color: 'rgb(89, 95, 99)', marginLeft: '-65px'}}>Register</h1>
      <FormikForm style={{display: 'flex', flexDirection: 'column', margin: '20px'}}>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <div style={{display: 'flex', alignContent: 'center'}}>
          <Field style={{width: '20px', background: 'rgba(120, 166, 189, 1)', marginBottom: '5px'}}
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <p style={{margin: '5px', fontSize: '12px', color: 'rgb(125, 125, 125)'}}>Terms of Service</p>
        </div>
        <button type="submit">Submit</button>
      </FormikForm>
    </div>
      <UserList users={users} />
    </div>
  )
}

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(6, "Password must be 6 characters or longer")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(Form);

export default FormikOnboardingForm;