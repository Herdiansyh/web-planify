<?php

namespace App\Http\Controllers;

use App\Enums\CardStatus;
use App\Models\Card;
use App\Models\Member;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    //
   public function index(): Response
{
    return inertia('Dashboard', [
        'page_settings' => [
            'title' => 'dashboard',
            'subtitle' => 'You can see a summary of the information here',
        ],
        'count' => [
            'users' => User::count(),
            'workspace' => Member::query()
                ->where('members.user_id', request()->user()->id)
                ->whereHasMorph('memberable', Workspace::class)
                ->count(),
            'task' => Member::query()
                ->where('members.user_id', request()->user()->id)
                ->whereHasMorph('memberable', Card::class)
                ->count(),
            'dones' => Member::query()
                ->where('members.user_id', request()->user()->id)
                ->whereHasMorph('memberable', Card::class, fn($query) =>
                    $query->where('status', CardStatus::DONE->value)
                )
                ->count(),
        ]
    ]);
}

}
