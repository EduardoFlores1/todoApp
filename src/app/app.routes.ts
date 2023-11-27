import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', title: 'Home', component: HomeComponent},
    {path: 'labs', title: 'Labs', component: LabsComponent}
];
