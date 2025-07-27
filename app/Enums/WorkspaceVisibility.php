<?php 

namespace App\Enums;

enum WorkspaceVisibility: string
{
    case PUBLIC = 'PUBLIC';
    case PRIVATE = 'PRIVATE';
  

    /**
     * Get the display name for the visibility.
     */
    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) =>[
            'value' => $item->value,
            'label' => $item->value,
            
        ])->values()->toArray();
    }
    
        };
    











