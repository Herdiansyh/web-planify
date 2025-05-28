import { cn } from '@/lib/utils';

// destruction lebih sederhana
export default function HeaderForm({ className, title, subtitle }) {
    return (
        <div className={cn('px-4 sm:px-0', className)}>
            <h2 className="text-base font-semibold leading-relaxed text-foreground">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{subtitle}</p>
        </div>
    );
}

// tanpa destruction
// export default function headerform (props){
//     return (<>
//     <div>{props.className}</div>
//     <div>{props.title}</div>
//     <div>{props.subtitle}</div>
//     </>);
// }

// destruction sederhana
// export default function HeaderForm(props) {

//        const {className, title, subtitle} = props;
//     return (
//         <>
//             <div>{className}</div>
//             <div>{title}</div>
//             <div>{subtitle}</div>

//         </>
//     );
// };
