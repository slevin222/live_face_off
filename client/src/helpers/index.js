import React from 'react';

//creates each input field for the sign up page.
export function formInput({input, type, placeholder, icon, id, meta: {touched, error}}){ //formInput parameters are being deconstructed.
    return (
        <div className='row rowlines'>
            <div className='input-field col s12'>
                <i className='material-icons prefix'>{icon}</i><input {...input} type={type} id={id} className='validate' placeholder={placeholder} required/>
                <p style={{margin: 0, paddingLeft: '10%'}} className='red-text'>{touched && error}</p>
            </div>
        </div>
    )
}