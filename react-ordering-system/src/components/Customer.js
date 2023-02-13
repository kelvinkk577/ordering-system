import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Customer.css';
import MenuItem from './MenuItem';

function Customer() {

  const [menuItems, setMenuItems] = useState([]);
  const [menuItemAmounts, setMenuItemAmounts] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/api/menu')
    .then(res => res.data)
    .then(data => {
      setMenuItems(data);
      return data;
    })
    .then(data => {
      for (let item of data)
      {
        setMenuItemAmounts(prev => ({...prev, [item.itemId]: 0}))
      }
    });
  }, []);

  function addMenuItemAmount(itemId, num)
  {
    setMenuItemAmounts(prev => {
      if (prev[itemId] + num < 0)
        return ({...prev, [itemId]: 0});
      return ({...prev, [itemId]: prev[itemId] + num});
    })
  }

  async function submitOrder()
  {
    let orderItems = [];
    for (let [key, value] of Object.entries(menuItemAmounts))
    {
      if (value !== 0)
        orderItems.push({itemId: key, orderItemAmount: value});
    }

    if (orderItems.length === 0)
      return alert("請選取至少一項食物\nPlease select at least one item from the menu")
    
    const res = await axios.post('http://localhost:3001/api/order', {customerPhone: "00000000", customerEmail: "efg123@gmail.com", orderItems: orderItems});
    console.log(res.data);
    window.location.reload();
  }

  return (
    <div className="customerApp">
      <div className="center">
        {menuItems.length > 0 && menuItems.map(({itemId, itemName, categoryDescription, itemPrice}) => <MenuItem key={itemId} id={itemId} name={itemName} category={categoryDescription} price={itemPrice} amount={menuItemAmounts[itemId]} addAmount={addMenuItemAmount}/>)}
      </div>
      <div className="checkoutBar">
        <div></div>
        <div className="buttonContainer">
          <button type="button" className="submitBtn" onClick={submitOrder}>下單</button>
        </div>
        <div className="container">

        </div>
      </div>
    </div>
  );
}

export default Customer;
