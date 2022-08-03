import  { useState } from 'react'

export const useForm = ( initialState = {} )=> {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {

        console.log(target.name , target.value);

        setValues( {
            ...values,
            [ target.name ]: target.value
        } )

        //console.log( 'En useForm: ', values );

    }

    const inputChanges = ( input, targetValue  ) =>{
        //console.log('CHANGES: ',input.name, targetValue);
        setValues({ [ input.name ]: targetValue })
    }

    return [ values, handleInputChange, inputChanges, reset ];
}