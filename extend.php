<?php

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Extend;
use InTime\MoneyPro\Listener\UserRegistered;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/extension.js')
        ->css(__DIR__ . '/less/extension.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Routes('api'))
        ->post('/money/webhook/deposit', 'money.webhook.deposit', 'InTime\\MoneyPro\\Api\\Controller\\HandleDepositWebhookController'),

    (new Extend\Event)
        ->listen(Serializing::class, function (Serializing $event) {
            if ($event->isSerializer(CurrentUserSerializer::class)) {
                $event->attributes['money_balance'] = $event->model->money_balance ?? 0;
                $event->attributes['money_deposit_id'] = $event->model->money_deposit_id ?? null;
            }
        })
        ->listen(\Flarum\User\Event\Registered::class, UserRegistered::class),
];
