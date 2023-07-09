import React from "react";
import  loading  from "./loading.gif";

export const Loading = () => {
    return (
        <div className="container d-flex" style={{height: '100%'}}>
           <img src={loading} alt='loading'  width={100} className='m-auto' />
        </div>
    )
}