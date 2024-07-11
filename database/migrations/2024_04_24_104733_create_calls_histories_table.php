<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCallsHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calls_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('queue_id')->nullable();
            $table->integer('service_id')->nullable();
            $table->integer('counter_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('call_status_id')->nullable();
            $table->unsignedBigInteger('call_status_id')->nullable()->change();
            $table->integer('token_number')->nullable();
            $table->date('called_date')->nullable();
            $table->timestamp('date_time')->nullable();
            $table->time('waiting_time')->nullable();
            $table->time('served_time')->nullable();
            $table->time('turn_around_time')->nullable();
            $table->string('token_letter')->nullable();
            $table->string('category')->nullable();
            $table->string('status')->nullable();
            $table->dateTime('started_at')->nullable();
            $table->dateTime('ended_at')->nullable();
            $table->string('category_time')->nullable();
            $table->boolean('is_recall')->nullable();
            $table->unsignedBigInteger('re_call_status_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('calls_histories');
    }
}
