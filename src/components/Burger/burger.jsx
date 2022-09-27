import React, { useState, useEffect, useContext } from 'react'
import './burger.css'
import { Buttons } from './buttons'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../Authentication/auth-context'
import ButtonsContext from './buttons-context'


export const Burger = () => {

  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [price, setPrice] = useState(3)
  const [ingredients, setIngredients] = useState({ lettuce: 0, bacon: 0, cheese: 0, meat: 0 })
  const [length, setLength] = useState(-1)
  useEffect(() => {
    if (ingredients.lettuce == 0 && ingredients.bacon == 0 && ingredients.cheese == 0 && ingredients.meat == 0) {
      setLength(0)
    }
    console.log("length:", length)

  }, [setIngredients])

  const updateIngredients = (action, label) => {
    let quantity = 0, ingreditent_price = 0;
    action == 'add' ? quantity += 1 : quantity -= 1

    switch (label) {
      case 'lettuce':
        quantity += ingredients.lettuce
        quantity = quantity < 0 ? 0 : quantity
        ingreditent_price = 0.70
        setIngredients({ ...ingredients, lettuce: quantity })
        break;
      case 'cheese':
        quantity += ingredients.cheese
        quantity = quantity < 0 ? 0 : quantity
        ingreditent_price = 0.40
        setIngredients({ ...ingredients, cheese: quantity })
        break;
      case 'bacon':
        quantity += ingredients.bacon
        quantity = quantity < 0 ? 0 : quantity
        ingreditent_price = 0.30
        setIngredients({ ...ingredients, bacon: quantity })
        break;
      case 'meat':
        quantity += ingredients.meat
        quantity = quantity < 0 ? 0 : quantity
        ingreditent_price = 1.40
        setIngredients({ ...ingredients, meat: quantity })
        break;
    }
    action == 'add' ? setPrice(price + ingreditent_price) : setPrice(price - ingreditent_price)
  }
  const BurgerItems = () => {

    let burger = [];
    for (let i = 0; i < ingredients.lettuce; i++) {
      burger.push(<div key={burger.length} className="lettuse"></div>);
    }
    for (let i = 0; i < ingredients.bacon; i++) {
      burger.push(<div key={burger.length} className="bacon"></div>);
    }
    for (let i = 0; i < ingredients.cheese; i++) {
      burger.push(<div key={burger.length} className="cheese"></div>);
    }
    for (let i = 0; i < ingredients.meat; i++) {
      burger.push(<div key={burger.length} className="meat"></div>);
    }

    if (burger.length == 0) {
      burger.push(<h4>No Ingredients Added</h4>)
    }
    return burger
  }

  return (
    <>
      <div className="burger-container mt-5">
        <div className="burger-top"></div>
        <BurgerItems />
        <div className="burger-bottom"></div>
      </div>
      <div className="options-container" key={ingredients.length}>
        <ButtonsContext.Provider value={{ ingredients, updateIngredients }}>

          <p>Current price: <span> ${price.toFixed(2)}</span></p>
          <Buttons label="lettuce" quantity={ingredients.lettuce} />
          <Buttons label="cheese" quantity={ingredients.cheese} />
          <Buttons label="bacon" quantity={ingredients.bacon} />
          <Buttons label="meat" quantity={ingredients.meat} />

        </ButtonsContext.Provider>
        {console.log("len: ", BurgerItems().length)}
        {auth.currentUser ?
          <button className={BurgerItems().length == 1 ? 'disbale-btn checkout' : 'checkout-btn'} disabled={BurgerItems().length == 1} onClick={() => navigate('/order')}>CHECKOUT</button>
          :
          <button className={BurgerItems().length == 1 ? 'disbale-btn checkout' : 'checkout-btn'} disabled={BurgerItems().length == 1} onClick={() => navigate('/auth')}>Sign up to checkout</button>

        }

      </div>


    </>
  )
}
