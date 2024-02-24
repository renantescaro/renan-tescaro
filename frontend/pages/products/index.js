import { useState, useEffect } from 'react';

const ProductsPage = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productsPerPage = 25;

    useEffect(() => {
        filterProducts(searchTerm);
    }, [searchTerm]);

    const filterProducts = (term) => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div>
            <h1>Produtos</h1>
            <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {currentProducts.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <button onClick={nextPage} disabled={indexOfLastProduct >= filteredProducts.length}>Próxima</button>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}

export default ProductsPage;