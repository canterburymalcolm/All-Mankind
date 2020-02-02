import { useRouter } from 'next/router';
import Link from 'next/link';

const Product = () => {
    const router = useRouter();
    const { product } = router.query;

    return (
        <div>
            <h1>Product Page</h1>
            <h2>{product}</h2>
            <Link href="/store">
                <a>back</a>
            </Link>
        </div>
    );
};

export default Product;