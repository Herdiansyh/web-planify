<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    // perbedaan fillable dan guarded: 
    // // - fillable: hanya atribut yang di tulis secara explisit diizinkan untuk diisi secara massal
    // // - guarded: semua atribut diizinkan kecuali atribut yang ditulis secara esplisit yang tidak diizinkan untuk diisi secara massal
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function workspaces()
    {
        return $this->hasMany(Workspace::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
    public function members()
    {
        return $this->hasMany(Member::class);
    }
    public function cards()
    {
        return $this->hasMany(Card::class);
    }
}
