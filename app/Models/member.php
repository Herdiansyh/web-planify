<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    //
    use HasFactory;
    protected $guarded = [];

    protected $with= ['user'];
    public function user()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(User::class);
    }
    public function memberable()
    {
        // morphTo = polymorphic one to one relationship
        return $this->morphTo();
    }
}
