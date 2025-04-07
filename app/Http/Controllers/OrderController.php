<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
  
    public function index(Request $request)
    {
        // Fetch orders along with the related user details
        $orders = Order::with('user') // Assuming 'user' is the relationship name
                       ->where('user_id', Auth::id())
                       ->orderBy('created_at', 'desc')
                       ->get();
    
        // If the request wants JSON, return the orders with the related user
        if ($request->wantsJson()) {
            return response()->json(['orders' => $orders]);
        }
    
        // Otherwise, return the orders to the Inertia view
        return Inertia::render('LiveOrders', [
            'orders' => $orders
        ]);
    }
    
    


    // Store a new order
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'products' => 'required|array',
            'products.*.name' => 'required|string',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric',
            'delivery_address' => 'required|string',
            'payment_method' => 'required|string|in:credit_card,paypal,mpesa', // Example payment methods
        ]);
    
        // Prepare the products array and calculate total product price
        $products = collect($request->products)->map(function ($product) {
            return [
                'name' => $product['name'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
                'total' => $product['quantity'] * $product['price'],
            ];
        })->toArray();
    
        // Calculate total price and set a delivery fee (this can be dynamic based on address, etc.)
        $totalPrice = collect($products)->sum('total');
        $deliveryFee = 10.00; // Example static delivery fee, adjust as needed
        $total = $totalPrice + $deliveryFee;
    
        // Create the order and store product details as JSON
        $order = Order::create([
            'user_id' => Auth::id(),
            'delivery_address' => $request->delivery_address,
            'payment_method' => $request->payment_method,
            'status' => 'pending', // Default order status
            'products' => $products, // Save products as JSON
            'total' => $total, // Store the total price of the order
            'delivery_fee' => $deliveryFee, // Store the delivery fee
        ]);
    
        return redirect()->route('dashboard')->with('success', 'Order placed successfully!');
    }
    

    // Display a specific order
    public function show($id)
    {
        $order = Order::with('user')->findOrFail($id);
        $products = $order->products; 
        if (request()->wantsJson()) {
            return response()->json([
                'order' => $order,
                'products' => $products,
            ]);
        }
    
        return Inertia::render('dashboard', compact('order', 'products'));
    }
    

    // Update an order (e.g., change status to completed, cancel, etc.)
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        // Example: Change the order status
        $order->status = $request->status;
        $order->save();

        return redirect()->route('orders.index')->with('success', 'Order updated successfully!');
    }

    // Cancel an order
    public function cancel($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
    
        $orders = Order::with('user')
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
    
        return Inertia::render('OrderHistory', [
            'orders' => $orders,
        ]);
    }
}
