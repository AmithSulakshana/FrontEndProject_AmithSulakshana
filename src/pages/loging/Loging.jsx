import axios from 'axios'
import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Loging = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    userName:'',
    password:''
  }

  const validationSchema = Yup.object().shape({
    userName:Yup.string().required("userName is required"),
    password: Yup.string().required("Password is required"),
  })

  const handleLoging = (data) =>{
    
    axios.get('http://localhost:3000/users').then((res)=>{
      
      const users = res.data

      const user = users.find(user => user.name === data.userName && user.password === data.password);
      if(user){
         alert('Loging Success')
         localStorage.setItem("userName",data.userName)
         localStorage.setItem("userRole",user.role)
         dispatch(loginSuccess({ userName:data.userName,userRole:user.role}));
         navigate('/users')
      }

      else{
        alert.error('Login Failed');
      }
   })
  }

  return (
    <div className='loging-main'>
       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLoging}>
          {({ getFieldProps, errors, touched }) => (
            <Form className='logging-form'>
              <div className='form-div'>
                <label className='logging-label1'>User Name: </label>
                <Field
                    {...getFieldProps('userName')}
                    type='text'
                    placeholder = "Enter Your Name"
                    className={errors.userName && touched.userName ? 'error':'error2'}
                >

                </Field>
                <ErrorMessage name='userName' component='div' className='error1'/>
               
              </div>

              <div className='form-div'>
                <label className='logging-label1'>Password: </label>
                 <Field
                    {...getFieldProps('password')}
                    type='password'
                    placeholder = "Enter Your pasword"
                    className={errors.password && touched.password ? 'error':'error2'}
                 >

                 </Field>
                 <ErrorMessage name='password' component='div' className='error1'/><br/>
              </div>
              <button type='submit' className='logging-button'>LOGIN</button>
                
            </Form>

          )
          }
        </Formik>
    </div>
  )
}

export default Loging;
  