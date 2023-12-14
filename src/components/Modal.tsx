import { useCallback, useEffect, useRef } from 'react'
import './MovieBox.css'
import { singleMovie } from './Types/app'

type TModal = {
    Movie: singleMovie | null
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}
function Modal({ Movie, showModal,setShowModal }: TModal) {
    const MovieConRef = useRef<HTMLDivElement | null>(null)
    
    const CloseModal = useCallback(() => {
        if (MovieConRef.current) {
            
            MovieConRef.current.addEventListener('click', (e) => {
                setShowModal(false)
                console.log(MovieConRef.current);
            })
        }
    }, [setShowModal])
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setShowModal(false)
            }
        })
    }, [setShowModal])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div ref={MovieConRef} onClick={CloseModal} className={`p-0 col-12 modalCon ${showModal ? 'd-flex' : 'd-none'}  justify-content-center align-items-center`}>
                    <div  className='col-10 d-flex flex-column'>
                        <div className='col-12 ModalImg'>
                            <img alt={Movie?.title} src={`https://image.tmdb.org/t/p/w500${Movie?.poster_path}`} className="img-fluid h-100 w-100" />
                        </div>
                    </div>
                </div>
            </div>
    </div>
)
}

export default Modal