import { Modal, TextInput, Button, NumberInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia.js

export default function OrderModal({ open, onClose, product }) {
    const [formData, setFormData] = useState({
        productName: '',
        productPrice: 0,
        quantity: 1,
        deliveryAddress: '',
        paymentMethod: 'credit_card', // Default payment method
    });

    useEffect(() => {
        if (product) {
            // Prefill form data when product is passed
            setFormData({
                productName: product.title,
                productPrice: product.price,
                quantity: 1, // Default quantity
                deliveryAddress: '', // Optional: You can prefill address if required
                paymentMethod: 'credit_card', // Default payment method
            });
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the products array
        const products = [{
            name: formData.productName,
            price: formData.productPrice,
            quantity: formData.quantity,
        }];

        // Send the form data via Inertia
        Inertia.post('/orders', {
            products: products,
            delivery_address: formData.deliveryAddress,
            payment_method: formData.paymentMethod,
        });

        // Optionally close the modal after submission
        onClose();
    };

    return (
        <Modal opened={open} onClose={onClose} title="Order Product">
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Product Name"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    readOnly
                />
                <TextInput
                    label="Price"
                    value={`$${formData.productPrice}`}
                    readOnly
                />
                <NumberInput
                    label="Quantity"
                    value={formData.quantity}
                    onChange={(value) => setFormData({ ...formData, quantity: value })}
                    min={1}
                    mb="sm"
                />
                <TextInput
                    label="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    mb="sm"
                    required
                />
                <TextInput
                    label="Payment Method"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    mb="sm"
                />
                <Button type="submit" fullWidth>Place Order</Button>
            </form>
        </Modal>
    );
}
