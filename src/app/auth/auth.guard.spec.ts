import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard, RegisterGuard } from './auth.guard';
import { Route, RouterModule } from '@angular/router';
import { CardComponent } from '../components/card/card.component';
import { MatCardModule } from '@angular/material';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

describe('AuthGuard', () => {
  const routes: Route[] = [
    { path: 'card', component: CardComponent }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent
      ],
      imports:[
        CommonModule,
        RouterModule.forRoot(
          routes
        ),

        MatCardModule,
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' },AuthGuard, RegisterGuard ],
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
