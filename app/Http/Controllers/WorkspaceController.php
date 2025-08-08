<?php

namespace App\Http\Controllers;

use App\Enums\CardStatus;
use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkSpaceRequest;
use App\Http\Resources\CardResource;
use App\Http\Resources\WorkspaceResource;
use App\Models\Member;
use App\Models\User;
use App\Models\Workspace;
use App\Traits\HasFile;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response as InertiaResponse;

class WorkspaceController extends Controller
{
    use HasFile;
    //
    public function create()
    {
        return inertia(component : 'Workspaces/Create', props:[
            'page_settings' => [
                'title' => 'Create Workspace',
                'subtitle' => 'fill out this form to add a new workspace',
                'method' => 'POST',
                'action' => route('workspaces.store'),
            ],
            'visibilities' => WorkspaceVisibility::options(),
        ]);
    }
    public function store(WorkSpaceRequest $request) :RedirectResponse
    {
        $workspace =$request->user()->workspaces()->create([
            'name' => $name = $request->name,
            'slug' => str()->slug($name . str()->uuid(10)),
            'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'), 
            'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility,
        ]);
  $workspace->members()->create([
            'user_id' => $request->user()->id,
            'role' => $workspace->user_id = $request->user()->id ? 'owner': 'member'
        ]);
        flashMessage('Workspace created successfully','success');
 return to_route('workspaces.show', $workspace);
    }

    public function show (Workspace $workspace):Response
    {
        return inertia(component : 'Workspaces/Show', props: [
            'cards'=> fn()=> CardResource::collection($workspace->load([
                 'cards'=> fn($q) => $q->withCount(['tasks','members','attachments'])->with([
                    'attachments',
                    'members',
                    'tasks' => fn($task) => $task->withCount('children'),

                 ])->orderBy('order')
                 ])->cards),
            'workspace' => fn()=> new WorkspaceResource($workspace),
                 'page_settings' => [
                'title' => $workspace->name,
                 ],
                 'statuses' =>fn()=> CardStatus::options(),
        ]);
    }

    public function edit(Workspace $workspace): Response
    {
        Gate::authorize('update_workspace', $workspace);
        return inertia(component : 'Workspaces/Settings', props: [
            'workspace' => fn()=> new WorkspaceResource($workspace->load('members')),
            'page_settings' => [
                'title' => 'Edit Workspace',
                'subtitle' => 'fill out this form to edit workspace',
                'method' => 'PUT',
                'action' => route('workspaces.update', $workspace),
            ],
            'visibilities' => WorkspaceVisibility::options(),
        ]);
    }
    public function update(Workspace $workspace, WorkSpaceRequest $request): RedirectResponse
    {        Gate::authorize('update_workspace', $workspace);

        $workspace->update([
               'name' => $name = $request->name,
            'slug' => str()->slug($name . str()->uuid(10)),
            'cover' => $request->hasFile('cover') ? $this->upload_file($request, 'cover', 'workspaces/cover') : $workspace->cover, 
            'logo' => $request->hasFile('logo') ? $this->upload_file($request, 'logo', 'workspaces/logo') : $workspace->logo,
            'visibility' => $request->visibility,
       
        ]);
        flashMessage('Workspace updated successfully','success');
        return to_route('workspaces.show', $workspace);
    }

    public function destroy(Workspace $workspace): RedirectResponse
    {
        Gate::authorize('delete_workspace', $workspace);
        $this->delete_file($workspace,'cover');
        $this->delete_file($workspace,'logo');
        $workspace->members()->delete();
        $workspace->delete();
        flashMessage('Workspace deleted successfully', 'success');
        return to_route('dashboard');
    }

    public function member_store(Workspace $workspace, Request $request): RedirectResponse
    {
        Gate::authorize('member_workspace', $workspace);
        $request->validate([
            'email' => ['required', 'email', 'string'],
        ]);

        $user = User::query()->where('email', $request->email)->first();

        if (!$user) {
            flashMessage('User not found', 'error');
            return back();
        }
        if ($workspace->members()->where('user_id', $user->id)->exists()) {
            flashMessage('User is already a member of this workspace', 'error');
            return back();
        }
        $workspace->members()->create([
            'user_id' => $user->id,
            'role' => 'member',
        ]); 
        flashMessage('User invited to workspace successfully', 'success');
        return back();
    }

    public function member_destroy (Workspace $workspace, Member $member): RedirectResponse
    {
       

        $member->delete();
        flashMessage('Member removed from workspace successfully', 'success');
        return back();
    }

}