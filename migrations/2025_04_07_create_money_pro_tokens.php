<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('money_pro_tokens')) {
            $schema->create('money_pro_tokens', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('symbol');
                $table->string('chain');
                $table->string('type');
                $table->string('token_address')->nullable();
                $table->string('deposit_wallet');
                $table->integer('points_rate');
                $table->decimal('min_deposit', 20, 10)->default(0.01);
                $table->boolean('is_enabled')->default(true);
                $table->timestamps();
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('money_pro_tokens');
    }
];
