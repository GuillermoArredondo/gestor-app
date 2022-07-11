import  { useState } from 'react'

export const useFormDate = ( initialState = {} )=> {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ( e, name ) => {

        console.log(name , e);

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