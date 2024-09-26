import React, { useEffect, useState } from "react";
import { http } from "../../services/config";
import { Card } from "antd";
import { NavLink } from "react-router-dom";
import CartPage from "../CartPage/CartPage";
import Swal from "sweetalert2";

export default function HomePage() {
  // tạo state cho cart và listShoe
  let [cart, setcart] = useState([]);
  let [listShoe, setlistShoe] = useState([]);
  // tạo hàm addCart
  let addCart = (shoe) => {
    let newCart = [...cart];
    let index = cart.findIndex((item) => item.id === shoe.id);
    if (index !== -1) {
        newCart[index].total += 1;
    } else {
        newCart.push({ ...shoe, total: 1 });
    }
    setcart(newCart);
  };
  // tạo hàm deleteCart
  let deleteCart = (idshoe) => {
    let newCart = cart.filter((item) => item.id !== idshoe);
    setcart(newCart);
  }
  // tạo hàm upDownShoe
  let upDownShoe = (idshoe,option) => {
    let newCart = [...cart];
    let index = cart.findIndex((item) => item.id === idshoe);
    // newCart[index].total += option;
    let newTotal = newCart[index].total + option;

    // Đảm bảo total không nhỏ hơn 1
    newCart[index].total = Math.max(newTotal, 1);
    setcart(newCart);
  }
  // tạo hàm renderDetail
  let renderDetail = (shoe) => {
    Swal.fire({
      title: shoe.name,
      text: shoe.description,
      imageUrl: shoe.image,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  }
  // lấy API
  useEffect(() => {
    http
      .then((result) => {
        setlistShoe(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
// check cart khi thay đổi
  useEffect(() => {
    console.log("cart in homepage", cart);
  }, [cart]);

  return (
    <div className="row text-center">
      <div className="row col-6">
        <h2>List Product</h2>
      {listShoe.map((item, index) => {
        return (
          <div key={index} className="card text-start col-4">
            <img src={item.image} style={{ height: 200, object: "fit",width:200 }} />
            <div className="card-body">
              <h5 style={{ height:50 }} className="card-title text-center">{item.name}</h5>
              <div className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => addCart(item)}
                >
                  Buy
                </button>
                <button onClick={()=>{renderDetail(item)}} className="btn btn-dark mx-1"
                  to={`/${item.quantity}`}>Detail</button>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      <div className="col-6">
        {/* truyền dữ liệu từ cha homepage qua con cartpage */}
        <CartPage cart={cart} deleteCart={deleteCart} upDownShoe={upDownShoe}/>
      </div>
    </div>
  );
}
