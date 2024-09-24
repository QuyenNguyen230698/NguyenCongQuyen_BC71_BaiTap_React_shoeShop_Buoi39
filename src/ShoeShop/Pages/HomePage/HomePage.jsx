import React, { useEffect, useState } from "react";
import { http } from "../../services/config";
import { Card } from "antd";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  let [cart, setcart] = useState([]);
  let [listShoe, setlistShoe] = useState([]);
  let addCart = (shoe) => {
    let newCart = [...cart];
    let index = cart.findIndex((item) => item.id === shoe.id);
    if (index !== -1) {
        newCart[index].total += 1;
    } else {
        newCart.push({ ...shoe, total: 1 });
    }
    console.log('newCart',newCart);
    setcart(newCart);
  };
  useEffect(() => {
    http
      .then((result) => {
        setlistShoe(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="row">
      {listShoe.map((item, index) => {
        return (
          <div key={index} className="card text-start col-3">
            <img src={item.image} style={{ height: 300, object: "fit" }} />
            <div className="card-body">
              <h5 className="card-title text-center">{item.name}</h5>
              <div className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => addCart(item)}
                >
                  Buy
                </button>
                <NavLink
                  className="btn btn-dark mx-1"
                  to={`/detail/${item.quantity}`}
                >
                  Detail
                </NavLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
