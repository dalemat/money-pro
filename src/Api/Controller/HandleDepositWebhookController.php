<?php

namespace InTime\MoneyPro\Api\Controller;

use Flarum\Api\Controller\AbstractSimpleController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Database\ConnectionInterface;

class HandleDepositWebhookController extends AbstractSimpleController
{
    protected $db;

    public function __construct(ConnectionInterface $db)
    {
        $this->db = $db;
    }

    protected function handle(ServerRequestInterface $request)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $from = Arr::get($data, 'from_address');
        $to = Arr::get($data, 'to_address');
        $value = (float) (Arr::get($data, 'value', 0) / 1e18);
        $txHash = Arr::get($data, 'hash');
        $rawData = Arr::get($data, 'raw', []);
        $inputData = strtolower(Arr::get($rawData, 'data', ''));

        $depositId = null;
        foreach (str_split($inputData, 2) as $i => $byte) {
            if (substr($inputData, $i * 2, 8) === '444550') {
                $candidate = substr($inputData, $i * 2, 14);
                if (preg_match('/444550[0-9a-f]{8}/', $candidate)) {
                    $ascii = hex2bin($candidate);
                    if (preg_match('/DEP\d{8}/', $ascii, $m)) {
                        $depositId = $m[0];
                        break;
                    }
                }
            }
        }

        if (!$depositId) return $this->response->noContent(400);

        $wallet = $this->getSetting('money_pro_deposit_wallet');
        if (!$wallet || strtolower($to) !== strtolower($wallet)) {
            return $this->response->noContent(400);
        }

        if ($this->db->table('money_pro_deposits')->where('tx_hash', $txHash)->exists()) {
            return $this->response->noContent(200);
        }

        $user = $this->db->table('users')->where('money_deposit_id', $depositId)->first();
        if (!$user) return $this->response->noContent(404);

        $rate = (int) $this->getSetting('money_pro_rate', 1000);
        $min = (float) $this->getSetting('money_pro_min_deposit', 0.01);

        if ($value < $min) return $this->response->noContent(200);

        $points = (int)($value * $rate);

        $this->db->transaction(function () use ($user, $points, $txHash, $value) {
            $this->db->table('users')->where('id', $user->id)->increment('money_balance', $points);
            $this->db->table('money_pro_transactions')->insert([
                'user_id' => $user->id,
                'type' => 'deposit',
                'amount' => $points,
                'description' => "Deposited {$value} tokens",
                'created_at' => now(),
                'updated_at' => now()
            ]);
            $this->db->table('money_pro_deposits')->insert([
                'tx_hash' => $txHash,
                'user_id' => $user->id,
                'token_amount' => $value,
                'points_awarded' => $points,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        });

        return $this->response->noContent(200);
    }

    private function getSetting($key, $default = null)
    {
        return $this->db->table('settings')->where('key', $key)->value('value') ?? $default;
    }
}
