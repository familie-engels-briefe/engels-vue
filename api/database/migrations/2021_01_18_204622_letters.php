<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Letters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->id();

            $table->string('number', 50)
                  ->index();
            $table->string('title', 512)
                  ->nullable();

            $table->longText('norm')
                  ->nullable();
            $table->longText('dipl')
                  ->nullable();

            $table->timestamps();
        });

        DB::statement('ALTER TABLE `letters` ADD FULLTEXT letters_search_index (norm)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('letters');
    }
}
