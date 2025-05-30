<?php


namespace App\Service;


use DateTime;
use DateTimeZone;
use Symfony\Component\String\AbstractUnicodeString;
use Symfony\Component\String\Slugger\AsciiSlugger;

class SanitizeData
{
    public function fullSanitize($value, $return = null): ?AbstractUnicodeString
    {
        if($value != null){
            $value = trim($value);
            $value = mb_strtolower($value);
            $value = str_replace(" ", "", $value);

            return $this->slugString($value);
        }

        return $return;
    }

    public function slugString($data, $return = null): ?AbstractUnicodeString
    {
        if($data != null){
            $slug = new AsciiSlugger();
            return $slug->slug($data);
        }

        return $return;
    }

    public function sanitizeString($value, $return = null): ?string
    {
        if($value != "" && $value != null){
            $value = trim($value);
            return htmlspecialchars($value);
        }

        return $return;
    }

    public function trimData($value, $return = null): ?string
    {
        if($value != "" && $value != null){
            return trim($value);
        }

        return $return;
    }

    public function createDateTime($value, $return = null): ?DateTime
    {
        if($value != "" && $value != null){
            $dateTime = new DateTime($value, new DateTimeZone('Europe/Paris'));
            $dateTime->setTimezone(new DateTimeZone('UTC'));
            return $dateTime;
        }

        return $return;
    }

    public function createDate($value, $format = "Y-m-d", $return = null): ?DateTime
    {
        if($value != "" && $value != null){
            return DateTime::createFromFormat($format, $value);
        }

        return $return;
    }

    public function setToFloat($value, $return = null): ?float
    {
        if($value == 0 || $value == "0"){
            return ($value == null) ? $return : (float) $value;
        }
        return ($value == "" || $value == null) ? $return : (float) $value;
    }

    public function setToInt($value, $return = null): ?int
    {
        if($value == 0 || $value == "0"){
            return ($value == null) ? $return : (int) $value;
        }
        return ($value == "" || $value == null) ? $return : (int) $value;
    }
}
