import './Landing.css'
import logo from '../assets/icons8-netflix-logo-ios-16-filled/icons8-netflix-logo-150.svg'
import banner from '../assets/banner.jpg'
import firstWrapperImg from '../assets/landingImg.jpeg'
import MobileWrapperImg from '../assets/mobile-0819.jpg'
import devicePile from '../assets/device-pile.png'
import kidsImg from '../assets/kids.png'
import LandingPageWrapSection from './LandingPageWrapSection'
import { StyledButton } from './StyledComponents/StyledButton'
import * as yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'
import Collapsee from './antd/Collapse'
import { Link } from 'react-router-dom'
function LandingPage() {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
    })
    const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    
    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleSubmit()
    }
    return (
        <div className='container-fluid'>
            <div className='row mb-2'>
                <div className='col-12 headerSection position-relative p-0 d-flex justify-content-center align-items-start'>
                    <div className='col-12 position-absolute top-0 start-0 h-100 w-100 z-1'>
                        <img className='w-100 h-100 img-fluid ' src={banner} alt="banner" />
                    </div>
                    <div className='col-12 position-absolute top-0 start-0 h-100 w-100 overlay z-2'></div>
                    <div className='col-12 d-flex justify-content-between align-items-center'>
                        <div className='col-4 ps-3 logo position-relative z-3'>
                            <img src={logo} alt="logo" className='img-fluid' />
                        </div>
                        <StyledButton className='col-1 p-1 me-3 z-3'>Sign In</StyledButton>
                    </div>
                    <div style={{color:'white'}} className='homeSubscription d-flex flex-column'>
                        <h1 className='col-9'>Unlimited movies, TV shows, and more</h1>
                        <span className='col-12 mb-5'>Starts at EGP 70. Cancel anytime.</span>
                        <span className='col-12'>Ready to watch? Enter your email to create or restart your membership.</span>
                        <form onSubmit={handleSubmitForm} className='col-12 mt-3 d-flex justify-content-between'>
                            <div className='col-8'>
                                <input
                                className='col-12 rounded p-2'
                                name='email'
                                type="email"
                                placeholder='Email address'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {touched.email && errors.email && <span className='text-danger col-12 my-1 d-flex'>{errors.email}</span>}
                        </div>
                            <StyledButton type='submit' className='col-3'>Get Started</StyledButton>
                        </form>
                    </div>

                </div>
            </div>

            <LandingPageWrapSection header='Enjoy on your TV' paragraph='Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.' img={firstWrapperImg} />

            <LandingPageWrapSection header='Download your shows to watch offline' paragraph='Save your favorites easily and always have something to watch.' img={MobileWrapperImg} flexWrap='flex-row-reverse' />

            <LandingPageWrapSection header='Watch everywhere' paragraph='Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.' img={devicePile} />

            <LandingPageWrapSection header='Create profiles for kids' paragraph='Send kids on adventures with their favorite characters in a space made just for them—free with your membership.' img={kidsImg} flexWrap='flex-row-reverse' />

            <div className='row d-flex justify-content-center ' style={{ backgroundColor: 'black' }}>
                <div className='col-10 mt-4 p-0'>
                    <Collapsee />
                </div>
            </div>
            <div style={{backgroundColor:'black'}} className='row d-flex justify-content-center'>
                <div className='col-12 d-flex my-5 '>
                    <div className='col-3 d-flex flex-column'>
                        <Link className='col-12 landPageLink mb-2' to=''>FAQ</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Investor Relations</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Privacy</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Speed Test</Link>
                    </div>
                    <div className='col-3 d-flex flex-column'>
                        <Link className='col-12 landPageLink mb-2' to=''>Help Center</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Jobs</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Cookie Preferences</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Legal Notices</Link>
                    </div>
                    <div className='col-3 d-flex flex-column'>
                        <Link className='col-12 landPageLink mb-2' to=''>Account</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Ways to Watch</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Corporate Information</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Only on Netflix</Link>
                    </div>
                    <div className='col-3 d-flex flex-column'>
                        <Link className='col-12 landPageLink mb-2' to=''>Media Center</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Terms of Use</Link>
                        <Link className='col-12 landPageLink mb-2' to=''>Contact Us</Link>
                        
                    </div>
                </div>
            </div>

        </div>
)
}

export default LandingPage