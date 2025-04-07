import OrderModal from '@/Components/OrderModal';
import {
    Card, Image, Text, SimpleGrid, Button, Loader, Center, RangeSlider, Box, Title
} from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Products({ products = [], searchTerm = '' }) {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product details

    useEffect(() => {
        const [min, max] = priceRange;

        const searchFiltered = products.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const priceFiltered = searchFiltered.filter((p) =>
            p.price >= min && p.price <= max
        );

        setFilteredProducts(priceFiltered);
    }, [products, searchTerm, priceRange]);

    if (!products.length) {
        return <Center><Loader size="lg" /></Center>;
    }

    // This function will open the modal and prefill the product details
    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setModalOpened(true);
    };

    return (
        <Box p="md">
            <OrderModal
                open={modalOpened}
                onClose={() => setModalOpened(false)}
                product={selectedProduct} // Pass the selected product to the modal
            />

            <Title order={3} mb="sm">Filter by Price</Title>
            <RangeSlider
                min={0}
                max={2000}
                value={priceRange}
                onChange={setPriceRange}
                label={(val) => `$${val}`}
                mb="xl"
            />

            <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {filteredProducts.map((product) => (
                    <Card key={product.id} shadow="md" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image src={product.thumbnail || product.image} height={160} alt={product.title} />
                        </Card.Section>
                        <Text weight={500} size="lg" mt="md">{product.title}</Text>
                        <Text color="dimmed" size="sm">${product.price}</Text>
                        <Button
                            onClick={() => handleOrderClick(product)} // Open modal with the selected product
                            fullWidth mt="md" color="green"
                        >
                            Order
                        </Button>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
}
