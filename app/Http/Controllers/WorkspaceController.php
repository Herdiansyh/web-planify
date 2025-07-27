<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkSpaceRequest;
use App\Models\Workspace;
use App\Traits\HasFile;
use Illuminate\Http\Request;

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
    public function store(WorkSpaceRequest $request)
    {
$request->user()->workspaces()->create([
            'name' => $name = $request->name,
            'slug' => str()->slug($name . str()->uuid(10)),
            'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'), 
            'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility,
        ]);

        flashMessage('Workspace created successfully','success');
 return back();
    }

}
