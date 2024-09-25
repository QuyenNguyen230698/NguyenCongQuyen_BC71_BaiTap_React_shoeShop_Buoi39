import React, { memo, useState } from "react";

 function CartPage({cart,deleteCart,upDownShoe}) {
    const renderCart = () => {
        if (!Array.isArray(cart) || cart.length === 0) {
            return (
              <tr>
                <td colSpan="5" className="text-center">
                  Cart is empty
                </td>
              </tr>
            );
          }
          
        return (
            cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td style={{ width:337 }}>{item.name}</td>
                  <td>
                    <img src={item.image} alt={item.name} style={{ width: 50 }} />
                  </td>
                  <td>{item.price}$</td>
                  <td>
                    <button onClick={()=>{upDownShoe(item.id,-1)}} className="btn btn-dark">-</button>
                    <strong className="mx-2">{item.total}</strong>
                    <button onClick={()=>{upDownShoe(item.id,1)}} className="btn btn-success">+</button>
                  </td>
                  <td><button onClick={()=>{deleteCart(item.id)}} className="btn btn-warning">Delete</button></td>
                </tr>
              ))
        )
      };

  return (
    <div>
        <h2>List Card</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th style={{ width:337 }} scope="col">NAME</th>
              <th scope="col">IMAGE</th>
              <th scope="col">PRICE</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>{renderCart()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(CartPage);