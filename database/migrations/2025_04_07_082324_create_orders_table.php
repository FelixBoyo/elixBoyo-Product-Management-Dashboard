<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to the users table
            $table->enum('status', ['pending', 'dispatched', 'completed', 'canceled'])->default('pending');
            $table->decimal('total', 10, 2); // Total price of the order
            $table->json('products');
            $table->decimal('delivery_fee', 10, 2); 
            $table->string('delivery_address');
            $table->string('payment_method'); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}

