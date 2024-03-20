<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMrnDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mrn_details', function (Blueprint $table) {
            $table->id();
            $table->string('mrn_no')->nullable();
            $table->string('first_name_en')->nullable();
            $table->string('middle_name_en')->nullable();
            $table->string('last_name_en')->nullable();
            $table->string('first_name_ar')->nullable();
            $table->string('middle_name_ar')->nullable();
            $table->string('last_name_ar')->nullable();
            $table->date('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('national_id')->nullable();
            $table->string('mobile_no')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mrn_details');
    }
}
