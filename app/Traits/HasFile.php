<?php 
namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HasFile
{
    /**
     * Handle file upload and return the file path.
     */
    public function upload_file(Request $request, string $column, string $folder): ?string
    {
        return $request->hasfile($column) ? $request->file($column)->store($folder) : null;}

    public function update_file (Request $request, Model $model, string $column, string $folder): ?string
    {
        if($request->hasfile($column)){
            if($model->$column){
                // Delete the old file
                Storage::delete($model->$column);
            }
            $thumbnail = $request->file($column)->store($folder);
        } else{
            $thumbnail = $model->$column;
        }
        return $thumbnail;
    }

    public function delete_file(Model $model, string $column): void
    {
        if($model->$column){
            Storage::delete($model->$column);
        }
    }

}


?>