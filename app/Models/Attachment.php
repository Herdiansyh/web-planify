<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'user_id',
        'card_id',
        'file',
        'link',
        'name',
    ];

    public function user()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(User::class);
    }
    public function card()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(Card::class);
    }   
    
}
