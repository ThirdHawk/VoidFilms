import React from 'react'
import loaderImg from '../../images/loading.gif'

let Loader = () => {
    return(
        <div>
            <img src={loaderImg} style={{height:'90vh', width:'100vh'}}/>
        </div>
    )
}
export default Loader