import React from 'react';

export function formInput({input, type, placeholder, icon, id, meta: {touched, error}}){
    return (
        <div className="row rowlines">
            <div className="input-field col s12">
                <i className="material-icons prefix">{icon}</i><input {...input} type={type} id={id} className="validate" placeholder={placeholder} required/>
                <p style={{margin: 0, paddingLeft: '10%'}} className='red-text'>{touched && error}</p>
            </div>
        </div>
    )
}