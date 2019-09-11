    import React, { Component } from "react";
    import api from "../../services/api";
    import './styles.css'

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
        const { products } = this.state;
        return (
        <div className="product-list">
        {products.map(products => (
                <article key={products._id}>
                <strong>{products.title}</strong>
                <p>{products.description}</p>

                <a href="">Acedar</a>
                </article>
            ))}
                    <div className="actions">
            <button onClick={this.prevPage}>Anterior</button>
            <button onClick={this.nextPage}>Próximo</button>

            </div>
        </div>
        );
    };
    };
