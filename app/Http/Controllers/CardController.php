<?php

namespace App\Http\Controllers;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use App\Http\Requests\CardRequest;
use App\Models\Card;
use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CardController extends Controller
{

    public function create(Workspace $workspace):Response
    {
        return inertia('Cards/Create', [
           'page_settings' => [
            'title' => 'Create Card',
            'subtitle' => 'Create a new card in the workspace',
            'method' => 'POST',
            'action' => route('cards.store', $workspace),
           ],
           'status'=> request()->status ?? 'To Do',
           'statuses' => CardStatus::options(),
           'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
           'priorities' => CardPriority::options(),
              'workspace' => fn()=>$workspace->only ('slug'),
        ]); 
    }

    public function store(Workspace $workspace, CardRequest $request): RedirectResponse
    {
        $card = $request->user()->cards()->create([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $status = $request->status,
            'order' => $this->ordering($workspace, $status),
            'priority' => $request->priority,
        ]);
        flashMessage('Card created successfully', 'success');
        return to_route('workspaces.show', [$workspace]);
  }
  public function ordering (Workspace $workspace, string $status): int{
$last_card =Card::query()
            ->where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderByDesc('order')
            ->first();

            if (!$last_card) return 1; 
// If no cards exist, start with order 1
            
        return $last_card->order + 1;

  }

}
