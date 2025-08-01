<?php

namespace App\Http\Controllers;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use App\Http\Requests\CardRequest;
use App\Http\Resources\CardSingleResource;
use App\Models\Card;
use App\Models\Workspace;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CardController extends Controller
{

    // public function create(Workspace $workspace):Response
    // {
    //     return inertia('Cards/Create', [
    //        'page_settings' => [
    //         'title' => 'Create Card',
    //         'subtitle' => 'Create a new card in the workspace',
    //         'method' => 'POST',
    //         'action' => route('cards.store', $workspace),
    //        ],
    //        'status'=> request()->status ?? 'To Do',
    //        'statuses' => CardStatus::options(),
    //        'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
    //        'priorities' => CardPriority::options(),
    //           'workspace' => fn()=>$workspace->only ('slug'),
    //     ]); 
    // }
public function create(Workspace $workspace): Response
{
    return inertia('Cards/Create', [
        'page_settings' => [
            'title' => 'Create Card',
            'subtitle' => 'Create a new card in the workspace',
            'method' => 'POST',
            'action' => route('cards.store', $workspace),
        ],
        'status_from_query' => request()->status ?? 'To Do',
        'priority_from_query' => request()->priority ?? CardPriority::UNKNOWN->value,
        'statuses' => CardStatus::options(),
        'priorities' => CardPriority::options(),
        'workspace' => fn () => $workspace->only('slug'),
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

         $card->members()->create([
            'user_id' => $request->user()->id,
            'role' => $card->user_id== $request->user()->id?'owner':'Member',
        ]);

        flashMessage('Card created successfully', 'success');
        return to_route('cards.edit', [$workspace, $card]);
  }
public function show(Workspace $workspace, Card $card): Response
{
    return inertia('Cards/Show', [
        'card' => fn() => new CardSingleResource($card->load(['members', 'user', 'tasks','attachments'])),
        'page_settings' => [
            'title' => 'Detail Card',
            'subtitle' => 'You can see card information',
        ]
        ]);
}

public function edit(Workspace $workspace, Card $card) : Response{
    return inertia('Cards/Edit',[
        'card' => fn() => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),
        'page_settings' => [
            'title' => 'Edit Card' ,
            'subtitle' => 'fill out this form to edit card' ,
            'method' => 'PUT', 
            'action' => route('cards.update',[$workspace, $card])
        ],
        'statuses' => CardStatus::options(),
        'priorities' => CardPriority::options(),
        'workspace' => fn() => $workspace->only('slug'),
        ]);
}

public function update(Workspace $workspace, Card $card, CardRequest $request): RedirectResponse
{
    $last_status =$card->status->value;
    $card->update([
        'title' => $request->title,
        'description' => $request->description,
        'deadline' => $request->deadline,
        'status' => $status = $request->status,
        'priority' => $request->priority,
        'order' => $this->ordering($workspace, $status),

    ]);
    $this->adjustOrdering($workspace, $last_status);
    flashMessage('Successfully updated card information');
    return back();

}

public function destroy(Workspace $workspace,Card $card): RedirectResponse
{
    $last_status = $card->status->value;
    $card->delete();
    $this->adjustOrdering($workspace, $last_status);
    flashMessage('card delete successfully');

     return to_route('workspaces.show', $workspace);
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

  public function adjustOrdering(Workspace $workspace, string $status){
    $order =1;
    return Card::where('workspace_id', $workspace->id)
    ->where('status', $status)
    ->orderBy('order')
    ->get()
    ->each(function($card) use(&$order){
        $card->order = $order;
        $card->save();
        $order++;
    });
  }

  public function reorder(Workspace $workspace, Card $card, Request $request): RedirectResponse
  {
    if ($request->cardActive['type'] === $request->cardOver['type']){
        $active = Card::find($request->cardActive['data']);
        $over = Card::find($request->cardOver['data']);

        if($active->status->value === $over->status->value){
            $temp_order = $active->order;
            $active->order =$over->order;
            $over->order= $temp_order;

            $active->save();
            $over->save();
        }else{
            $last_status_active = $active->status->value;
            $active->status= $over->status->value;
            $active->save();

            $this->adjustOrdering($workspace, $last_status_active);
            $this->adjustOrdering($workspace, $active->status->value);
        }
    }else {
        $active = Card::find($request->cardActive['data']);
        $last_status_active= $active->status->value;

        $active->status = $request->cardOver['data'];
        $active->order = $this->ordering($workspace, $request->cardOver['data']);
        $active->save();

        $this->adjustOrdering($workspace, $last_status_active);
    }

    flashMessage('Card has been successfully moved');
    return to_route('workspaces.show', $workspace);
  }
}
