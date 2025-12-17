import ProductCard from "../components/ProductCard";

const Home = () => {
    const products = [
        {
            id: 1,
            name: "Wireless Noise-Canceling Headphones",
            description:
                "High-quality wireless headphones with active noise cancellation and long-lasting battery life.",
            price: 199.99,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            name: "Mechanical Gaming Keyboard",
            description: "RGB mechanical keyboard with tactile switches, perfect for gaming and productivity.",
            price: 129.99,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1625130694338-4110ba634e59?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            name: "Wireless Gaming Mouse",
            description: "Ergonomic wireless mouse with adjustable DPI and ultra-low latency.",
            price: 79.99,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1625750188088-f6cd6756349c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 4,
            name: "OLED 4K Ultra HD Monitor with HDR Support, Wide Color Gamut and Eye-Care Technology",
            description: "27-inch 4K monitor with vibrant colors and ultra-slim bezels.",
            price: 449.99,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1527800792452-506aacb2101f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8NGslMjBtb25pdG9yfGVufDB8fDB8fHwy",
        },
        {
            id: 5,
            name: "Smartwatch Series X",
            description: "Modern smartwatch with health tracking, GPS, and customizable watch faces.",
            price: 249.99,
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?q=80&w=786&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 6,
            name: "Portable Bluetooth Speaker",
            description: "Compact speaker with powerful sound, deep bass, and water resistance.",
            price: 59.99,
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1507878566509-a0dbe19677a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 7,
            name: "Bluetooth Noise-Canceling Earbuds",
            description:
                "True wireless earbuds with active noise cancellation, immersive sound, and compact charging case.",
            price: 99.99,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1645020089405-ee44c2cd7c58?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 8,
            name: "Smart Home Security Camera",
            description:
                "Wi-Fi enabled indoor security camera with night vision, motion detection, and mobile app support.",
            price: 89.99,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1721333092193-ad0a76de3d9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMHNlY3VyaXR5JTIwY2FtZXJhfGVufDB8MXwwfHx8Mg%3D%3D",
        },
    ];

    return (
        <div className="w-full py-16 px-16">
            <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
