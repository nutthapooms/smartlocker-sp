
import { trigger, transition, style, animateChild, animate, query, group } from '@angular/animations';
var animation = [
    // style({ position: 'relative' }),
    // query(':enter, :leave', [
    //     style({
    //         position: 'absolute',
    //         height: '100%',
    //         top: 0,
    //         left: 0,
    //         transform: 'scale(1)',
    //         width: '100%'
    //     })
    // ]),
    // query(':enter', [
    //     style({ transform: 'scale(0.95)' })
    // ]),
    // query(':leave', animateChild()),
    // group([
    //     query(':leave', [
    //         animate('200ms ease', style({ transform: 'scale(1.05)', opacity: '0' }))
    //     ]),
    //     query(':enter', [
    //         animate('500ms ease', style({ transform: 'scale(1)' }))
    //     ])
    // ]),
    // query(':enter', animateChild()),
]
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('BrowseOption => *', animation),
        transition('CategoryOption => *', animation),
        transition('SubcategoryOption => *', animation),
        transition('LockerOption => *', animation),
        transition('Home => *', animation),
        transition('ReturnItems => *', animation),
        transition('ReportIssue => *', animation),

    ]);