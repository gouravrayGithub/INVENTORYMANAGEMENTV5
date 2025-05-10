import '../css/Modal.css';


function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>Id:{item.id}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ₹{item.price}</p>
      <p>Warehouse No: {item.warehouseNumber}</p>
    </div>
  );
}

export default ItemCard;
