<?php

namespace App\Observers;

use App\Models\Card;

class CardObserver
{
    //
      public function created(Card $card)
    {
        $card->members()->create([
            'user_id' => request()->user()->id,
            'role' => $card->user_id = request()->user()->id ? 'owner': 'member'
        ]);
    }

    public function deleted(Card $card)
    {
        $card->members()->delete();
    }
}
