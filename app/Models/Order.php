<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'total',
        'delivery_fee',
        'products', // Add products to the fillable array
        'delivery_address', // Include delivery_address if it's being passed
        'payment_method', // Include payment_method if it's being passed
    ];

    // You can also define the casting of 'products' to an array, if required
    protected $casts = [
        'products' => 'array',  // Automatically cast the 'products' field to an array
    ];

    // Relationship: Each order belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
