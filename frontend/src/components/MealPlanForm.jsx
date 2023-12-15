import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

export const MealPlanForm = ( {onSubmit, handleClose}) => {
    const [inputText, setInputText] = useState('');
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputText);
        setInputText('');
        handleClose();
    };

    return (
        <div>
            <label>Enter New Meal Name:</label>
            <input type='text' value={inputText} onChange={handleInputChange}/>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
};