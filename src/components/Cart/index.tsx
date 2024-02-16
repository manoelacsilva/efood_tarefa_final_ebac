import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'
import { formataPreco } from '../PratosRestaurante'

import Checkout from '../Checkout'

import {
  Overlay,
  CartContainer,
  Sidebar,
  CartItem,
  ValorTotal,
  ButtonContinuar
} from './styles'
//import { Prato } from '../../pages/Categories'
import { getTotalPrice } from '../../utils'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)
  const [payment, setPayment] = useState(false)
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar>
        {!payment && items.length > 0 ? (
          <>
            <ul>
              {items.map((item) => (
                <CartItem key={item.id}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h3>{item.nome}</h3>
                    <span>{formataPreco(item.preco)}</span>
                  </div>
                  <button onClick={() => removeItem(item.id)} type="button" />
                </CartItem>
              ))}
            </ul>
            <ValorTotal>
              <p>Valor total</p>
              <p>
                {formataPreco(getTotalPrice(items))}
                {''}
              </p>
            </ValorTotal>
            <ButtonContinuar
              title="Clique aqui para continuar com a entrega"
              type="button"
              onClick={() => setPayment(true)}
            >
              Continuar com a entrega
            </ButtonContinuar>
          </>
        ) : (
          <Checkout setPayment={setPayment}></Checkout>
        )}
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
