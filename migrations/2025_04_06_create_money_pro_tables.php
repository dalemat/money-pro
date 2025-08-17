<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('users', 'money_balance')) {
            $schema->table('users', function (Blueprint $table) {
                $table->integer('money_balance')->default(0);
                $table->string('money_deposit_id')->nullable()->unique();
            });
        }

        if (!$schema->hasTable('money_pro_transactions')) {
            $schema->create('money_pro_transactions', function (Blueprint $table) {
                $table->id();
                $table->integer('user_id');
                $table->integer('target_user_id')->nullable();
                $table->string('type');
                $table->integer('amount');
                $table->text('description')->nullable();
                $table->string('reference_type')->nullable();
                $table->integer('reference_id')->nullable();
                $table->timestamps();
            });
        }

        if (!$schema->hasTable('money_pro_deposits')) {
            $schema->create('money_pro_deposits', function (Blueprint $table) {
                $table->id();
                $table->string('tx_hash')->unique();
                $table->integer('user_id');
                $table->decimal('token_amount', 20, 10);
                $table->integer('points_awarded');
                $table->timestamps();
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('money_pro_transactions');
        $schema->dropIfExists('money_pro_deposits');
        $schema->table('users', function ($table) {
            $table->dropColumn(['money_balance', 'money_deposit_id']);
        });
    }
];
