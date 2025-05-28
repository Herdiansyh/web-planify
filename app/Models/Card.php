<?php

namespace App\Models;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
        'workspace_id',
        'title',
        'description',
        'deadline',
        'order',
        'status',
        'priority',
    ];
    protected function casts(): array
    {
        return [
            'status' => CardStatus::class,
            'priority' => CardPriority::class,
        ];
    }

    public function user()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(User::class);
    }
    public function workspace()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(Workspace::class);
    }
    public function attachments()
    {
        // hasmany = one to many relationship
        return $this->hasMany(Attachment::class);
    }
    public function tasks()
    {
        // hasmany = one to many relationship
        return $this->hasMany(Task::class);
    }
    public function members()
    {
        // morphmany = polymorphic one to many relationship
        return $this->morphMany(Member::class, 'memberable');
    }
}
