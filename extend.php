<?php

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/extension.js')
        ->css(__DIR__ . '/less/extension.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Settings)
        ->serializeToApi('money_pro_start_balance', 'money_pro_start_balance', 'intval')
        ->serializeToApi('money_pro_like_cost', 'money_pro_like_cost', 'intval')
        ->serializeToApi('money_pro_reply_cost', 'money_pro_reply_cost', 'intval')
        ->serializeToApi('money_pro_deposit_wallet', 'money_pro_deposit_wallet')
        ->serializeToApi('money_pro_rate', 'money_pro_rate', 'intval')
        ->serializeToApi('money_pro_min_deposit', 'money_pro_min_deposit', 'floatval'),

    (new Extend\Routes('api'))
        ->post('/money/webhook/deposit', 'money.webhook.deposit', 'InTime\\MoneyPro\\Api\\Controller\\HandleDepositWebhookController'),

    (new Extend\Event)
        ->listen(Serializing::class, function (Serializing $event) {
            if ($event->isSerializer(CurrentUserSerializer::class)) {
                $event->attributes['money_balance'] = $event->model->money_balance ?? 0;
                $event->attributes['money_deposit_id'] = $event->model->money_deposit_id ?? null;
            }
        }),

    (new Extend\ServiceProvider)
        ->register('InTime\\MoneyPro\\Listener\\UserRegistered')
];
