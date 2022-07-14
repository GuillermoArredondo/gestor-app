import  { useState } from 'react'

export const useFormInput = ( initialState = {} )=> {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ( e, name ) => {

        console.log(e , name)
        setValues( {
            ...values,
            [ name]: e
        } )

        //console.log( 'En useForm: ', values );

    }

    const inputChanges = ( input, targetValue  ) =>{
        console.log('CHANGES: ',input.name, targetValue);
        setValues({ [ input.name ]: targetValue })
    }

    return [ values, handleInputChange, inputChanges, reset ];
}