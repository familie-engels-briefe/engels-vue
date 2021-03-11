<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Letter;

class CreateSanitizedLetterColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('letters', function (Blueprint $table) {
            $table->longText('norm_sanitized')
                  ->nullable()
                  ->after('norm');
            $table->longText('dipl_sanitized')
                  ->nullable()
                  ->after('dipl');
        });

        $letters = Letter::all();
        foreach ($letters as $letter) {
            /**
             * @var $letter Letter
             */
            $letter->sanitizeHtml();
            $letter->save();
        }

        DB::statement('ALTER TABLE `letters` DROP INDEX letters_search_index');
        DB::statement('ALTER TABLE `letters` ADD FULLTEXT letters_search_index (norm_sanitized)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE `letters` DROP INDEX letters_search_index');
        DB::statement('ALTER TABLE `letters` ADD FULLTEXT letters_search_index (norm)');

        Schema::table('letters', function (Blueprint $table) {
            $table->dropColumn('norm_sanitized');
            $table->dropColumn('dipl_sanitized');
        });
    }
}
