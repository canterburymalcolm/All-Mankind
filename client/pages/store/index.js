import Link from 'next/link';

const inventory = [
    {
        id: 1,
        name: 'product1',
        price: '10$'
    },
    {
        id: 2,
        name: 'product2',
        price: '20$'
    },
    {
        id: 3,
        name: 'product3',
        price: '30$'
    },
];

const Store = () => {
    return (
        <div>
            <h1>Store</h1>
            <div>
                {inventory.map(product => (
                    <div key={product.id}>
                        <Link href='/store/[product]' as={`/store/${product.name}`}>
                            <a>{product.name}</a>
                        </Link>
                    </div>
                ))}
            </div>
            <br></br>
            <Link href='/'>
                <a>back</a>
            </Link>
        </div>
    )
};

export default Store;