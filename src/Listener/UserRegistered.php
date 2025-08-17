<?php

namespace InTime\MoneyPro\Listener;

use Flarum\User\Event\Registered;
use Illuminate\Events\Dispatcher;
use Illuminate\Database\ConnectionInterface;

class UserRegistered
{
    protected $db;

    public function __construct(ConnectionInterface $db)
    {
        $this->db = $db;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Registered::class, [$this, 'handle']);
    }

    public function handle(Registered $event)
    {
        $user = $event->user;
        $startBalance = (int) $this->getSetting('money_pro_start_balance', 100);

        $this->db->table('users')->where('id', $user->id)->update([
            'money_balance' => $startBalance,
            'money_deposit_id' => 'DEP' . str_pad($user->id, 8, '0', STR_PAD_LEFT)
        ]);

        $this->db->table('money_pro_transactions')->insert([
            'user_id' => $user->id,
            'type' => 'register',
            'amount' => $startBalance,
            'description' => 'Welcome bonus',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    private function getSetting($key, $default = null)
    {
        return $this->db->table('settings')->where('key', $key)->value('value') ?? $default;
    }
}
