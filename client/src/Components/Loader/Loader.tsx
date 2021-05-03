import React, { useState } from 'react';
import './Loader.Style.css'

interface loaderProps {
    loadingState: boolean,
  }

const Loader : React.FC <loaderProps> = ({loadingState}) =>{
    return(
        <div>
            <div className={loadingState ? "show" : "hide"}>
                <div>
                    <div className="coverBackground" >
                    <div className="loaderStyle"></div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Loader;