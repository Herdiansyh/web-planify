<?php 

namespace App\Enums;

enum CardStatus: string
{
    case TODO = 'To Do';
    case INPROGRESS = 'In Progress';
    case ONREVIEW = 'On Review';
    case DONE = 'Done';

  

    /**
     * Get the display name for the visibility.
     */
    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) =>[
            'value' => $item->value,
            'label' => $item->name,
            
        ])->values()->toArray();
    }
        };
    











