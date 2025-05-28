<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'user_id',
        'card_id',
        'parent_id',
        'title',
        'is_completed',
        
    ];
    protected $with = ['card', 'children', 'user'];
//     // Apa itu Eager Loading?
// Saat kamu mengambil data dari database dengan relasi (misalnya, Task punya User), ada dua cara untuk mendapatkan data relasinya:

// 1. Lazy Loading (Default)
// Kamu ambil data Task dulu.

// Saat kamu akses $task->user, Laravel baru nge-query ke database untuk mengambil data User.

// Kalau kamu looping banyak Task dan akses relasi user di masing-masing task, maka akan ada banyak query ke database, yaitu 1 query untuk task + N query untuk user (satu user per task).

// Ini yang disebut masalah N+1 query problem.

// Contoh:

// php
// Copy
// Edit
// $tasks = Task::all();  // 1 query ke table tasks

// foreach ($tasks as $task) {
//     echo $task->user->name;  // Setiap akses user -> 1 query ke table users
// }
// Kalau ada 100 task, bisa terjadi 1 + 100 = 101 query.

// 2. Eager Loading
// Kamu bilang ke Laravel dari awal, “Ambil juga data relasi user sekaligus!”

// Laravel akan melakukan join atau query terpisah yang efisien untuk mengambil semua user yang berelasi dengan task dalam 1 atau 2 query saja.

// Jadi akses $task->user tidak perlu query lagi karena data sudah diambil sekaligus.

// Contoh:

// php
// Copy
// Edit
// $tasks = Task::with('user')->get();  // 2 query: 1 untuk tasks, 1 untuk users yang terkait

// foreach ($tasks as $task) {
//     echo $task->user->name;  // Tidak ada query tambahan, data sudah siap
// }
// Ini mengurangi jumlah query, mempercepat aplikasi.

// Apa Bedanya dengan $with di Model?
// Kalau kamu selalu butuh relasi tertentu setiap ambil data model, kamu bisa pakai $with di model seperti ini:

// php
// Copy
// Edit
// protected $with = ['user', 'card', 'children'];
// Maka, setiap Task::all() otomatis akan eager load relasi tersebut tanpa perlu panggil with() manual.


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
    public function parent()
    {
        // belongsto = one to one relationship
        return $this->belongsTo(Task::class, 'parent_id');
    }
    public function children(){
        return $this->hasMany(Task::class, 'parent_id');
    }
}
