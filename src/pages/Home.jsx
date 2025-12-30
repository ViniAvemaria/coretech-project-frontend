import ProductCard from "../components/ProductCard";

const Home = () => {
    const products = [
        {
            id: 1,
            name: "Wireless Noise-Canceling Headphones",
            description:
                "High-quality wireless headphones with active noise cancellation and long-lasting battery life.",
            price: 1299.9,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop",
            photoCredit: {
                name: "Luke Peterson",
                url: "https://unsplash.com/@ldpeterson11",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "Active noise cancellation (ANC)",
                "Bluetooth 5.2 connectivity",
                "Up to 30 hours battery life",
                "Built-in microphone for calls",
            ],
            inStock: true,
        },
        {
            id: 2,
            name: "Mechanical Gaming Keyboard",
            description: "RGB mechanical keyboard with tactile switches, perfect for gaming and productivity.",
            price: 649.9,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1625130694338-4110ba634e59?q=80&w=735&auto=format&fit=crop",
            photoCredit: {
                name: "Bryan Natanael",
                url: "https://unsplash.com/@bryannatanael",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "Mechanical tactile switches",
                "Customizable RGB backlighting",
                "Anti-ghosting keys",
                "USB wired connection",
            ],
            inStock: true,
        },
        {
            id: 3,
            name: "Wireless Gaming Mouse",
            description: "Ergonomic wireless mouse with adjustable DPI and ultra-low latency.",
            price: 399.9,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1625750188088-f6cd6756349c?q=80&w=687&auto=format&fit=crop",
            photoCredit: {
                name: "Auguras Pipiras",
                url: "https://unsplash.com/@obuol",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "Adjustable DPI up to 16,000",
                "Ultra-low latency wireless",
                "Ergonomic design",
                "Rechargeable battery",
            ],
            inStock: true,
        },
        {
            id: 4,
            name: "OLED 4K Ultra HD Monitor with HDR Support, Wide Color Gamut and Eye-Care Technology",
            description:
                "Ultrawide curved OLED monitor with immersive panoramic view, deep blacks, and stunning 4K detail.",
            price: 6999.9,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1527800792452-506aacb2101f?w=500&auto=format&fit=crop&q=60",
            photoCredit: {
                name: "Alexandru Acea",
                url: "https://unsplash.com/@alexacea",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "OLED 4K Ultra HD resolution",
                "HDR support with wide color gamut",
                "Ultrawide curved display",
                "Eye-care and low blue light technology",
            ],
            inStock: false,
        },
        {
            id: 5,
            name: "Smartwatch Series X",
            description: "Modern smartwatch with health tracking, GPS, and customizable watch faces.",
            price: 1799.9,
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1637160151663-a410315e4e75?q=80&w=1974&auto=format&fit=crop",
            photoCredit: {
                name: "Klim Musalimov",
                url: "https://unsplash.com/@klim11",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "Heart rate and sleep monitoring",
                "Built-in GPS",
                "Water-resistant design",
                "Customizable watch faces",
            ],
            inStock: true,
        },
        {
            id: 6,
            name: "Portable Bluetooth Speaker",
            description: "Compact speaker with powerful sound, deep bass, and water resistance.",
            price: 299.9,
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1507878566509-a0dbe19677a5?q=80&w=687&auto=format&fit=crop",
            photoCredit: {
                name: "Jonas Jacobsson",
                url: "https://unsplash.com/@jonasjacobsson",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "Bluetooth wireless streaming",
                "Water-resistant (IPX rating)",
                "Deep bass enhancement",
                "Up to 12 hours battery life",
            ],
            inStock: true,
        },
        {
            id: 7,
            name: "Bluetooth Noise-Canceling Earbuds",
            description:
                "True wireless earbuds with active noise cancellation, immersive sound, and compact charging case.",
            price: 599.9,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1645020089405-ee44c2cd7c58?q=80&w=711&auto=format&fit=crop",
            photoCredit: {
                name: "Hrushi Chavhan",
                url: "https://unsplash.com/@hcphotos",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "True wireless design",
                "Active noise cancellation",
                "Compact charging case",
                "Touch controls",
            ],
            inStock: false,
        },
        {
            id: 8,
            name: "Smart Home Security Camera",
            description:
                "Wi-Fi enabled indoor security camera with night vision, motion detection, and mobile app support.",
            price: 449.9,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1721333092193-ad0a76de3d9c?w=500&auto=format&fit=crop&q=60",
            photoCredit: {
                name: "Samsung Memory",
                url: "https://unsplash.com/@samsungmemory",
                source: "Unsplash",
            },
            quantity: 0,
            specifications: [
                "Full HD video recording",
                "Night vision support",
                "Motion detection alerts",
                "Mobile app integration",
            ],
            inStock: true,
        },
    ];

    return (
        <div className="max-w-[1200px] w-full">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] place-items-center gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
