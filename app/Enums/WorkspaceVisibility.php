<?php 

namespace App\Enums;

enum WorkspaceVisibility: string
{
    case PUBLIC = 'Public';
    case PRIVATE = 'Private';
  

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
    











