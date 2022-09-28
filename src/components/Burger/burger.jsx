import React, { useState, useContext } from 'react'
import './burger.css'
import { Buttons } from './buttons'
import { useNavigate } from "react-router-dom";
import AuthContext from '../Authentication/auth-context'
import ButtonsContext from './buttons-context'


export const Burger = () => {

  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [price, setPrice] = useState(3)
  const [ingredients, setIngredients] = useState({ lettuce: [], bacon: [], cheese: [], meat: [] })
  const prices = { lettuce: 0.70, bacon: 0.30, cheese: 0.40, meat: 1.40 }

  const updateIngredients = (action, label) => {
    let quantity = 0;
    quantity = ingredients[label]
    action === 'add' ? quantity.push(label) : quantity.pop()
    setIngredients({ ...ingredients, label: quantity })
    action === 'add' ? setPrice(price + prices[label]) : setPrice(price - prices[label])
  }
  const BurgerItems = () => {

    let burger = [];
    ingredients.lettuce.forEach((item, key) => {
      burger.push(<div key={burger.length} className="lettuse"></div>);
    }
    )

    ingredients.cheese.forEach(
      (item, key) => {
        burger.push(<div key={burger.length} className="cheese"></div>);
      }
    )

    ingredients.bacon.forEach((item, key) => {
      burger.push(<div key={burger.length} className="bacon"></div>);
    }
    )

    ingredients.meat.forEach((item, key) => {
      burger.push(<div key={burger.length} className="meat"></div>);
    }
    )

    return burger
  }

  return (
    <>
      <div className="burger-container mt-5">
        <div className="burger-top"></div>
        {
          BurgerItems().length !== 0 ?
            <BurgerItems />
            : <h4>No Ingredients Added</h4>
        }
        <div className="burger-bottom"></div>
      </div>
      <div className="options-container" key={ingredients.length}>
        <ButtonsContext.Provider value={{ setIngredients, updateIngredients }}>

          <p>Current price: <span> ${price.toFixed(2)}</span></p>
          <Buttons label={"lettuce"} quantity={ingredients.lettuce.length} />
          <Buttons label={"cheese"} quantity={ingredients.cheese.length} />
          <Buttons label="bacon" quantity={ingredients.bacon.length} />
          <Buttons label="meat" quantity={ingredients.meat.length} />

        </ButtonsContext.Provider>

        {auth.currentUser ?
          <button className={BurgerItems().length === 0 ? 'btn btn-secondary checkout' : 'btn btn-primary'} disabled={BurgerItems().length === 0} onClick={() => navigate('/order')}>CHECKOUT</button>
          :
          <button className={BurgerItems().length === 0 ? 'btn btn-secondary checkout' : 'btn btn-primary'} disabled={BurgerItems().length === 0} onClick={() => navigate('/auth')}>Sign up to checkout</button>

        }

      </div>


    </>
  )
}
