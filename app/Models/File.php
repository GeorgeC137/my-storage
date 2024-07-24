<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Kalnoy\Nestedset\NodeTrait;
use App\Traits\HasCreatorAndUpdater;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class File extends Model
{
    use HasFactory, HasCreatorAndUpdater, NodeTrait, SoftDeletes;

    public function isOwnedBy($userId): bool
    {
        return $this->created_by == $userId;
    }

    public function get_file_size()
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $power = $this->size > 0 ? floor(log($this->size, 1024)) : 0;

        return number_format($this->size / pow(1024, $power), 2, '.', ',') . ' ' . $units[$power];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            if (!$model->parent) {
                return;
            }

            $model->path = (!$model->parent->isRoot() ? $model->parent->path . '/' : '') . Str::slug($model->name);
        });

        // static::deleted(function(File $model) {
        //     if (!$model->is_folder) {
        //         Storage::delete($model->storage_path);
        //     }
        // });
    }

    public function owner(): Attribute
    {
        return Attribute::make(
            get: function(mixed $value, array $attributes) {
                return $attributes['created_by'] = Auth::id() ? 'me' : $this->user->name;
            }
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(File::class, 'parent_id');
    }

    public function starred()
    {
        return $this->hasOne(StarredFile::class, 'file_id', 'id')->where('user_id', Auth::id());
    }

    public function isRoot()
    {
        return $this->parent_id === null;
    }

    public function moveToTrash()
    {
        $this->deleted_at = Carbon::now();

        return $this->save();
    }

    public function deleteForever()
    {
        $this->deleteFilesFromStorage([$this]);
        $this->forceDelete();
    }

    public function deleteFilesFromStorage($files)
    {
        foreach ($files as $file) {
            if ($file->is_folder) {
                $this->deleteFilesFromStorage($file->children);
            } else {
                Storage::delete($file->storage_path);
            }
        }
    }
}
