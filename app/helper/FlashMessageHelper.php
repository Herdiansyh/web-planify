<?php 


if(!function_exists('flash_message')) {
    function flash_message($message, $type = 'success'): void {
      
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}