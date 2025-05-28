<?php 

namespace App\Enums;

enum CardPriority: string
{
    case URGENT = 'Ugent';
    case HIGH = 'High';
    case MEDIUM = 'Medium';
    case LOW = 'Low';
    case UNKNOWN = 'Unknown';
   

  

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
    











