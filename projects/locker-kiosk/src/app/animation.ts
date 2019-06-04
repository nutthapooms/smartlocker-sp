
import { trigger, transition, style, animateChild, animate, query, group } from '@angular/animations';
var animation = [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-10%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('200ms ease', style({ left: '10%', opacity: '0'}))
      ]),
      query(':enter', [
        animate('200ms ease', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('BrowseOption => *', animation),
    transition('CategoryOption => *', animation),
    transition('SubcategoryOption => *', animation),
    transition('LockerOption => *', animation),
  ]);