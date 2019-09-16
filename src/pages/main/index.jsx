import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  // Para criar variaveis reativas, deve-se declara-las no méthodo state através de um listening pelo methodo render()
  state = {
    products: [],
    productInfo: {},
    page: 1
  };

  // Métodos que são própios do React, temos que criar funcoes desta forma
  componentDidMount() {
    this.loadProducts();
  }

  // Função própria - Arrow functions são utilizadas para conseguir referenciar outros methodos e variaveis da classe
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    const { page, productInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
