import { LandingPageWrapper } from "./StyledComponents/LandingPageWrapper"

type TLandingWrapper = {
    header: string
    paragraph: string
    img: string
    flexWrap?: string
    
}
function LandingPageWrapSection({header,paragraph,img,flexWrap}: TLandingWrapper) {
return (
    <div className="container-fluid p-0 mb-2">
        <div className="row">
            <LandingPageWrapper className={`col-12 d-flex justify-content-center align-items-center column-gap-5 ${flexWrap}`}>
                <div className='col-5 d-flex flex-column'>
                    <h1 className='col-12'>{header}</h1>
                    <p className='col-12'>{paragraph}</p>
                </div>
                <div className='col-4'>
                        <img alt='WrapperImg' src={img} className='img-fluid'/>
                    </div>
            </LandingPageWrapper>
        </div>
    </div>
)
}

export default LandingPageWrapSection