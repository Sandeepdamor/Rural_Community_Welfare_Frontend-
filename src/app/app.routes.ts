import { Routes } from '@angular/router';
import { ComponentRoutes } from './shared/utils/component-routes';
import { LandingpageComponent } from './landing-page/landingpage/landingpage.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LandingpageComponent, // Set LandingPageComponent as the default route
        pathMatch: 'full'
    },
    {
        path: ComponentRoutes.USERAUTH,
        loadChildren: () =>
            import('../app/authentication/authentication.module').then((m) => m.AuthenticationModule),
    },
    {
        path: ComponentRoutes.HOME,
        canActivate: [authGuard], // Add guard here
        loadChildren: () =>
            import('../app/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: '**',
        component: NotFoundComponent
      }  
];

