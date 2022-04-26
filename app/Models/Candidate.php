<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $table = 'candidate';

    protected $fillable = [
        'first_name',
        'last_name',
        'email1',
        'phone_cell',
        'experience',
        'resume',
        'notice_period',
        'enteredbycompanyid'
    ];
}
