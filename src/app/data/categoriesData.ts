
export type ProductStatus = "Available" | "unavailable" | "Short Stock";
interface Product {
    id: number;
    name: string;
    image: string;
    weight: string;
    category: string;
    price: string;
    date: string;
    stock: number | string;
    status: ProductStatus;
    isDateLate?: boolean;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Cucumber",
        image:
            "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=100&q=80",
        weight: "500-600gm",
        category: "Foods",
        price: "$ 15",
        date: "05/12/2024",
        stock: 500,
        status: "Available",
    },
    {
        id: 2,
        name: "Egg",
        image:
            "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=100&q=80",
        weight: "500-600gm",
        category: "Foods",
        price: "$ 15",
        date: "05/1/2024",
        stock: 50,
        status: "unavailable",
        isDateLate: true,
    },
    {
        id: 3,
        name: "Cake",
        image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=100&q=80",
        weight: "500-600gm",
        category: "Foods",
        price: "$ 15",
        date: "05/12/2024",
        stock: 300,
        status: "Available",
    },
    {
        id: 4,
        name: "Papaya",
        image:
            "https://images.unsplash.com/photo-1626016774070-e3847c2fcc56?auto=format&fit=crop&w=100&q=80",
        weight: "500-600gm",
        category: "Foods",
        price: "$ 15",
        date: "05/12/2024",
        stock: 2,
        status: "Short Stock",
    },
    {
        id: 5,
        name: "Pineapple",
        image:
            "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=100&q=80",
        weight: "500-600gm",
        category: "Foods",
        price: "$ 15",
        date: "05/12/2024",
        stock: 500,
        status: "Available",
    },
    {
        id: 6,
        name: "Pineapple",
        image:
            "https://images.unsplash.com/photo-1589187373726-e4f6e94c25eb?auto=format&fit=crop&w=100&q=80",
        weight: "1kg-1.2kg",
        category: "Foods",
        price: "$ 10",
        date: "05/12/2024",
        stock: 700,
        status: "Available",
    },
    {
        id: 7,
        name: "Ice-cream",
        image:
            "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=100&q=80",
        weight: "500-600gm",
        category: "Foods",
        price: "$ 12",
        date: "05/12/2024",
        stock: 800,
        status: "Available",
    },
    {
        id: 8,
        name: "Mango",
        image:
            "https://images.unsplash.com/photo-1553279768-1154c746f265?auto=format&fit=crop&w=100&q=80",
        weight: "1kg",
        category: "Foods",
        price: "$ 25",
        date: "05/12/2024",
        stock: 900,
        status: "Available",
    },
    {
        id: 9,
        name: "Orange",
        image:
            "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=100&q=80",
        weight: "1kg",
        category: "Foods",
        price: "$ 20",
        date: "05/12/2024",
        stock: 100,
        status: "Available",
    },
];