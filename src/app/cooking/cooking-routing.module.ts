import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookingTopbarComponent } from './cooking-topbar/cooking-topbar.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
    {
        path: '', component: CookingTopbarComponent,
        children: [
            {
                path: '',
                component: RecipeListComponent
            }
        ]
    }];
@NgModule ({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })

export class CookingRoutingModule { }
export const cookingComponent =  [CookingTopbarComponent, RecipeListComponent] ;
