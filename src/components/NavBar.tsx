import './NavBar.css'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/icons8-netflix-logo-ios-16-filled/icons8-netflix-logo-100.svg'
import { useDispatch } from 'react-redux'
import { logout } from './redux/userSlice'
import { useCallback } from 'react'


function NavBar() {
    const location=useLocation()
    const dispatch = useDispatch()
    const handleLogout=useCallback(()=>{
        dispatch(logout())
    },[dispatch])
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-12 d-flex HomeNavBar align-items-center p-0">
                        <div className="col-2 ps-3">
                            <img alt="logo" src={logo} className="img-fluid " />
                        </div>
                        <div className="col-8 d-flex">
                            <Link style={{color:location.pathname==='/home'?'#E50914':'white'}} reloadDocument className="col-auto ToPage" to='/home'>Home</Link>
                            <Link style={{color:location.pathname==='/films'?'#E50914':'white'}} reloadDocument className="col-auto mx-3 ToPage" to='/films'>Films</Link>
                            <Link style={{color:location.pathname==='/series'?'#E50914':'white'}} reloadDocument className="col-auto ToPage" to='/series'>Series</Link>
                    </div>
                    <div  className='col-2 d-flex'>
                        <div onClick={handleLogout} style={{ color: 'white', cursor: 'pointer', fontFamily: 'poppins' }} className='col-auto'>Logout</div>
                    </div>
                    </div>
            </div>
    </div>
)
}

export default NavBar