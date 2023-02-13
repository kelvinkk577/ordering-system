import './MenuItem.css';

function MenuItem(props)
{
  return (
    <div className="menuItem">
      <div className="information">
        <p className="name">{props.name}</p>
        <p className="category">{props.category}</p>
        <p className="price">${props.price}</p>
      </div>
      <div className="controls">
        <button type="button" className="minus" onClick={e => props.addAmount(props.id, -1)}>-</button>
        <p className="amount">{props.amount}</p>
        <button type="button" className="plus" onClick={e => props.addAmount(props.id, 1)}>+</button>
      </div>
    </div>
  )
}

export default MenuItem;