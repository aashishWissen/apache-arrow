import React, { useState, useRef } from 'react';
import './ScreenResizer.css'

const ScreenResizer = () => {
    const [defaultState, setDefaultState] = useState(1)
    const [currentState, setCurrentState] = useState(defaultState);

    const ref = useRef();
    console.log('ref = ', ref)

    const zoomIn = () => {
       const content = document.getElementsByClassName('content')[0];
       console.log(content)
       content.style.zoom = +currentState === 4 ? 4 : +currentState + 0.25;
        setCurrentState(content.style.zoom);
    }
    const zoomOut = () => {
        const content = document.getElementsByClassName('content')[0];
       content.style.zoom = +currentState === 0.50 ? 0.50 : currentState - 0.25;
        setCurrentState(content.style.zoom);
        
    }
    const reset = () => {
        const content = document.getElementsByClassName('content')[0];
       content.style.zoom = defaultState;
       setCurrentState(defaultState);
    }
    return (
        <>
        <div className='container'>
            <div className='innerContainer' ref={ref}>
                <button onClick={zoomIn}>Zoom in</button>
                <button onClick={zoomOut}>Zoom out</button>
                <button onClick={reset}>Reset</button>
                { currentState !== defaultState ?
                <span style={{color: '#ffffff'}}>{currentState * 100}%</span>
                : null }
            </div>
            </div>
        </>
    )
}

export default ScreenResizer;