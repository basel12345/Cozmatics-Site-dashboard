import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "categories",
        loadComponent: () => import("./modules/categories/categories.component").then(c => c.CategoriesComponent)
    },
    {
        path: "category",
        loadComponent: () => import("./modules/categories/add-categories/add-categories.component").then(c => c.AddCategoriesComponent)
    },
    {
        path: "category/:id",
        loadComponent: () => import("./modules/categories/add-categories/add-categories.component").then(c => c.AddCategoriesComponent)
    }
];
