import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

export const MealPlanForm = ( {onSubmit}) => {
    const [inputText, setInputText] = useState('');
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputText);
        setInputText('');
    };

    return (
        <div>
            <label>Enter New Meal Name:</label>
            <input type='text' value={inputText} onChange={handleInputChange}/>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
};