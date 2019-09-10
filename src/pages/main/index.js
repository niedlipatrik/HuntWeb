import React, { Component } from "react";
import api from "../../services/api";

export default class Main extends Component{
     // Para criar variaveis reativas, deve-se declara-las no méthodo state através de um listening pelo methodo render()
    state = {
        products: [],
    };


    componentDidMount(){
        this.loadProducts();
    }

loadProducts = async () => {
    const response = await api.get("/products");

    this.setState({ products: response.data.docs });
  };

  render() {
    return (
    <div className="product-list">
    {this.state.products.map(products => (
            <h2>{products.title}</h2>
        ))}
    </div>
    );
  };
}