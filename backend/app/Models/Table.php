<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    protected $fillable = ['nro','state'];

    public function toggleState()
    {
        $this->state = !$this->state;
        $this->save();
    }
}
