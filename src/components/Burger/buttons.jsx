import React, { useContext } from 'react'
import ButtonsContext from './buttons-context'
import './burger.css';

export const Buttons = (props) => {
  const { ingredients, updateIngredients } = useContext(ButtonsContext)

  return (
    <div className='container'>
      <div className='buttons-rows'>
        <p>{props.label}</p>
        <div className="btns mt-2">
          <button className={props.quantity == 0 ? 'disbale-btn' : 'decrease-btn'} onClick={() => updateIngredients('minus', props.label)} disabled={props.quantity == 0}> Less </button>
          <button className='increase-btn' onClick={() => updateIngredients('add', props.label)}> More </button>
        </div>
      </div>
    </div >
  )
}
