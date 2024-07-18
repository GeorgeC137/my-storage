<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\StoreFolderRequest;
use App\Http\Resources\FileResource;
use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
{
    public function myFiles(string $folder = null)
    {
        if ($folder) {
            $folder = File::query()->where('created_by', Auth::id())->where('path', $folder)->firstOrFail();
        }

        // dd($folder);

        if (!$folder) {
            $folder = $this->getRoot();
        }

        $files = File::query()
            ->where('parent_id', $folder->id)
            ->where('created_by', Auth::id())
            ->orderBy('is_folder', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $files = FileResource::collection($files);

        $ancestors = FileResource::collection([...$folder->ancestors, $folder]);

        $folder = new FileResource($folder);

        return Inertia::render('MyFiles', compact('files', 'ancestors', 'folder'));
    }

    public function createFolder(StoreFolderRequest $request)
    {
        $data = $request->validated();
        $parent = $request->parent;

        if (!$parent) {
            $parent = $this->getRoot();
        }

        $file = new File();
        $file->is_folder = 1;
        $file->name = $data['name'];

        $parent->appendNode($file);
    }

    public function store(StoreFileRequest $request)
    {
        $data = $request->validated();
        $parent = $request->parent;
        $user = $request->user();
        $fileTree = $request->file_tree;

        if (!$parent) {
            $parent = $this->getRoot();
        }

        if (!empty($fileTree)) {
            $this->saveFileTree($fileTree, $parent, $user);
        } else {
            foreach ($data['files'] as $file) {
                $this->saveFile($file, $parent, $user);
            }
        }

        // dd($data, $fileTree);
    }

    private function getRoot()
    {
        return File::query()->whereIsRoot()->where('created_by', Auth::id())->firstOrFail();
    }

    public function saveFileTree($fileTree, $parent, $user)
    {
        foreach ($fileTree as $name => $file) {
            if (is_array($file)) {
                $folder = new File();
                $folder->name = $name;
                $folder->is_folder = true;
                $parent->appendNode($folder);
                $this->saveFileTree($file, $folder, $user);
            } else {
                $this->saveFile($file, $parent, $user);
            }
        }
    }

    private function saveFile($file, $parent, $user): void
    {
        $path = $file->store('/files/' . $user->id);
        $model = new File();
        $model->name = $file->getClientOriginalName();
        $model->size = $file->getSize();
        $model->mime = $file->getMimeType();
        $model->is_folder = false;
        $model->storage_path = $path;
        $parent->appendNode($model);
    }
}
