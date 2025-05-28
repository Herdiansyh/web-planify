<?php

namespace App\Models;

use App\Enums\WorkspaceVisibility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Workspace extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'cover',
        'logo',
        'visibility',
    ];
    protected function casts(): array
    {
        return [
         'visibility'=> WorkspaceVisibility::class        ];
    }
    public function user()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(User::class);
    }
    public function cards()
    {
        // hasmany = one to many relationship
        return $this->hasMany(Card::class);
    }
    public function members() {
        return $this->morphMany(Member::class, 'memberable');
    }
}
