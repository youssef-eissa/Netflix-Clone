import { Link } from 'react-router-dom'
import './HomeFooter.css'
import { FacebookFilled,TwitterOutlined,InstagramOutlined,YoutubeFilled } from '@ant-design/icons'
function HomeFooter() {
    return (
        <div className='container-fluid mb-4 '>
            <div className='row d-flex justify-content-center'>
                <div className='col-8 d-flex HomeFooter flex-column p-0'>
                        <div className='col-12 d-flex justify-content-between icons '>
                            <div className='col-md-5 col-12 d-flex'> <Link className='col-2' to=''>
                            <FacebookFilled className='col-12 icon'/>

                            </Link>
                            <Link to='' className='col-2'>
                            <TwitterOutlined className='col-12 icon'/>

                            </Link>
                            <Link to='' className='col-2'>
                                <InstagramOutlined className='col-12 icon' />
                            </Link>

                            <Link to='' className='col-2'>
                                <YoutubeFilled className='col-12 icon' />
                            </Link></div>
                        </div>
                    <div className='col-12 d-flex flex-md-row flex-column'>
                        <div className='col-md-3 col-12 d-flex flex-column'>
                        <div className='col-12 d-flex flex-column footerLinks mt-2'>
                            <Link className='col-12 link' to=''>Audio Description</Link>
                            <Link className='col-12 link my-3' to=''>Investor Relations</Link>
                            <Link className='col-12 link' to=''>Legal Notices</Link>
                        </div>
                        <div className='col-5 py-1 text-center mt-4 serviceCode'>Service Code</div>
                        <span className='col-12 mt-4'>© 1996-{new Date().getFullYear()} Netflix, Inc.</span>
                        </div>
                        <div className='col-md-3 col-12 d-flex flex-column footerLinks mt-2'>
                            <Link className='col-12 link' to=''>Help Center</Link>
                            <Link className='col-12 link my-3' to=''>Jobs</Link>
                            <Link className='col-12 link' to=''>Cookies Preferences</Link>
                        </div>
                        <div className='col-md-3  col-12 d-flex flex-column footerLinks mt-2'>
                            <Link className='col-12 link' to=''>Gift Cards</Link>
                            <Link className='col-12 link my-3' to=''>Terms of Use</Link>
                            <Link className='col-12 link' to=''>Corporate Information</Link>
                        </div>
                        <div className='col-md-3 col-12 d-flex flex-column footerLinks mt-2'>
                            <Link className='col-12 link' to=''>Media Center</Link>
                            <Link className='col-12 link my-3' to=''>Privacy</Link>
                            <Link className='col-12 link' to=''>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
    </div>
)
}

export default HomeFooter