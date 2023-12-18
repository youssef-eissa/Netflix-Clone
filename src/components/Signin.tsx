import './signin.css'
import banner from '../assets/banner.jpg'
import logo from '../assets/icons8-netflix-logo-ios-16-filled/icons8-netflix-logo-150.svg'
import { Overlay } from './StyledComponents/StyledOverlay'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { StyledInput } from './StyledComponents/StyledInput'
import { EyeInvisibleOutlined } from '@ant-design/icons'
import {  useEffect, useState } from 'react'
import { StyledButton } from './StyledComponents/StyledButton'
import {  useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { getUser } from './fetches/FetchUsers'
import { setToken,setUser } from './redux/userSlice'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

type TUser = {
    token: string
    user:any
}
type user = {
    username:string
    password?:string
}

function Signin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state: TUser) => state.user.token)

    const [showPassword, setShowPassword] = useState(false);
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values as user)
        mutate({username:values.username,password:values.password})
        },
        
    })

    const {mutate,isError,isPending}=useMutation({
        mutationFn: (data: user) => getUser(data.username, data.password),
        onSuccess: (data) => {
            dispatch(setToken(data.data.token))
            dispatch(setUser(data.data))
            toast.success('Login Successful')
        },
    })
    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleSubmit()

    }
    useEffect(() => {
        if (isError) {
            toast.error('Invalid username or password')
        }
      
    }, [isError])
   
    useEffect(() => {
        if (token !== '') {
            navigate('/home')
        }
    }, [token])
    if (isPending) {
        return <Loader />
        
    }
    
    return (
        <div className='container-fluid p-0'>
            <div className='row'>
                <div className='col-12 signin position-relative min-vh-100 d-flex justify-content-center align-items-center flex-column'>
                    <div className='col-12  logo position-absolute top-0 z-3'>
                        <img src={logo} alt="logo" className='img-fluid' />
                    </div>
                        <div className='col-12 position-absolute top-0 start-0 h-100 w-100 z-1'>
                        <img className='w-100 h-100 img-fluid ' src={banner} alt="banner" />
                    </div>
                    <Overlay ></Overlay>
                    <form onSubmit={handleSubmitForm} className='col-4 rounded d-flex flex-column justify-content-center align-items-center z-3'>
                        <legend className='mb-5 col-12 text-center'>Sign in</legend>
                        <div className='col-10  mb-5'>
                            <StyledInput
                        placeholder='Username'
                        name='username'
                        type="text"
                        className='col-12'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.username && touched.username && <p className='text-danger m-0'>{errors.username}</p>}
                    </div>
                        <div className='col-10 mb-5'>
                            <div className='col-12 position-relative '>
                            <StyledInput
                        placeholder='Password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        className='col-12'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        <EyeInvisibleOutlined onClick={() => setShowPassword(!showPassword)} className='position-absolute top-50 translate-middle btn d-flex justify-content-center align-items-center p-0 end-0' style={{ fontSize: '20px', color: 'red', transition: 'all 0.3s ease' }} />
                        </div>
                        {errors.password && touched.password && <p className='text-danger m-0'>{errors.password}</p>}
                        </div>

                    <StyledButton type='submit' className='col-3 p-2 '>Signin</StyledButton>
                    </form>
                    <div><Toaster
                    position="top-left"
                    /></div>
                    
                </div>
            </div>
    </div>
)
}

export default Signin